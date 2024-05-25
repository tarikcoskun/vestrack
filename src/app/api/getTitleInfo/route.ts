import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id") as string;
  const type = params.get("type") as "movie" | "tv";

  if (!id || !type) {
    Response.json(
      { error: "No :id or :type provided" },
      {
        status: 400,
      }
    );
  }

  const data = await TmdbApi.getTitleInfo(id, type);
  return Response.json(data);
}
