import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const DEFAULT_CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const chromePath = process.env.CHROME_PATH ?? DEFAULT_CHROME;
const baseUrl = process.env.PROTOTYPE_URL ?? "http://localhost:3000";
const outDir =
  process.env.SCREENSHOT_DIR ?? path.resolve("docs/assets/prototipo-1");
const port = Number(process.env.CHROME_DEBUG_PORT ?? 9223);

const pages = [
  { file: "01-home.jpg", path: "/", height: 1200 },
  { file: "02-sobre.jpg", path: "/sobre", height: 900 },
  { file: "03-contato.jpg", path: "/contato", height: 900 },
  { file: "04-animais.jpg", path: "/animais", height: 1000 },
  { file: "05-detalhe-animal.jpg", path: "/animais/demo-mel", height: 900 },
  {
    file: "06-admin-acesso.jpg",
    path: "/admin/animais",
    height: 900,
    adminAccess: "remove",
  },
  {
    file: "07-admin-painel.jpg",
    path: "/admin/animais",
    height: 1400,
    adminAccess: "grant",
  },
  {
    file: "08-admin-cadastro.jpg",
    path: "/admin/animais/cadastro",
    height: 1200,
    adminAccess: "grant",
  },
  {
    file: "09-admin-edicao.jpg",
    path: "/admin/animais/demo-mel/editar",
    height: 1200,
    adminAccess: "grant",
  },
  {
    file: "10-admin-interesses.jpg",
    path: "/admin/animais/interesses",
    height: 1200,
    adminAccess: "grant",
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJsonEndpoint() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find((target) => target.type === "page");
        if (page?.webSocketDebuggerUrl) {
          return page.webSocketDebuggerUrl;
        }
      }
    } catch {
      // Chrome may still be starting.
    }
    await wait(250);
  }
  throw new Error("Chrome DevTools endpoint did not become available.");
}

function createCdpClient(socketUrl) {
  const socket = new WebSocket(socketUrl);
  let nextId = 1;
  const pending = new Map();
  const events = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result ?? {});
      }
      return;
    }

    const handlers = events.get(message.method);
    if (handlers) {
      for (const handler of handlers) {
        handler(message.params ?? {});
      }
    }
  });

  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const handler = (params) => {
          events.set(
            method,
            (events.get(method) ?? []).filter((item) => item !== handler),
          );
          resolve(params);
        };
        events.set(method, [...(events.get(method) ?? []), handler]);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function navigateAndWait(client, url) {
  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await loaded;
  await wait(900);
}

async function capture(client, item) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: item.height,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await navigateAndWait(client, `${baseUrl}${item.path}`);

  if (item.adminAccess === "remove") {
    await client.send("Runtime.evaluate", {
      expression:
        'localStorage.removeItem("anjos-admin-prototype-access"); location.reload();',
      awaitPromise: false,
    });
    await wait(1200);
  }

  if (item.adminAccess === "grant") {
    await client.send("Runtime.evaluate", {
      expression:
        'localStorage.setItem("anjos-admin-prototype-access", "granted"); location.reload();',
      awaitPromise: false,
    });
    await wait(1600);
  }

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 90,
    captureBeyondViewport: false,
  });

  await writeFile(
    path.join(outDir, item.file),
    Buffer.from(screenshot.data, "base64"),
  );
  console.log(`captured ${item.file}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const profileDir = await mkdtemp(path.join(tmpdir(), "anjos-screenshots-"));
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--window-size=1440,1200",
    "about:blank",
  ]);

  try {
    const socketUrl = await waitForJsonEndpoint();
    const client = createCdpClient(socketUrl);
    await client.ready;
    await client.send("Page.enable");
    await client.send("Runtime.enable");

    for (const item of pages) {
      await capture(client, item);
    }

    client.close();
  } finally {
    chrome.kill("SIGTERM");
    await wait(500);
    await rm(profileDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
