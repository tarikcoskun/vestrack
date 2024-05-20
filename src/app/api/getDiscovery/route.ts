import TmdbApi from "@/handlers/tmdb";

export async function GET() {
  const data = await TmdbApi.getDiscovery();
  return Response.json({ data });
}
