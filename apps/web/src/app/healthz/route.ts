export async function GET() {
  const apiUrl = process.env.API_INTERNAL_URL ?? "http://127.0.0.1:3333";

  try {
    const response = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    return Response.json(
      { status: response.ok ? "ok" : "degraded" },
      { status: response.ok ? 200 : 503 },
    );
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
