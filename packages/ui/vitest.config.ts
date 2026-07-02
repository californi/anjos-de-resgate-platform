import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@anjos/domain": new URL("../domain/src/index.ts", import.meta.url).pathname,
      "@anjos/shared": new URL("../shared/src/index.ts", import.meta.url).pathname
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
});
