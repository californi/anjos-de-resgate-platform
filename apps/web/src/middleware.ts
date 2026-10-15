import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.PUBLIC_DEMO_USER;
  const password = process.env.PUBLIC_DEMO_PASSWORD;

  if (!user || !password || request.nextUrl.pathname === "/healthz") {
    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    try {
      const [providedUser, providedPassword] = atob(
        authorization.slice("Basic ".length),
      ).split(":", 2);
      if (providedUser === user && providedPassword === password) {
        return NextResponse.next();
      }
    } catch {
      // Cabecalhos invalidos seguem como requisicoes nao autenticadas.
    }
  }

  return new NextResponse("Ambiente de demonstracao protegido", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Anjos de Resgate"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
