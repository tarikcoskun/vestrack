import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const type = params.get("type") as "all" | "movie" | "tv" | "person";
  const timeWindow = params.get("timeWindow") as "day" | "week";

  if (!type || !timeWindow) {
    Response.json(
      { error: "No :type or :timeWindow provided" },
      { status: 400 },
    );
  }

  const data = await TmdbApi.getTrending(type, timeWindow);
  return Response.json(data);
}
