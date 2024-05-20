import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const type = params.get("type") as "movie" | "tv" | "people";

  if (!type) {
    Response.json(
      { error: "No :type provided" },
      {
        status: 400,
      }
    );
  }

  const data = await TmdbApi.getTrending(type);
  return Response.json({ data });
}
