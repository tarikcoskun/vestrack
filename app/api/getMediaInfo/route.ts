import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const type = params.get("type") as "movie" | "tv";
  const id = params.get("id") as string;

  if (!id || !type) {
    Response.json(
      { error: "No :type or :id provided" },
      { status: 400 },
    );
  }

  const data = await TmdbApi.getMediaInfo(type, id);
  return Response.json(data);
}
