import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const query = params.get("query") as string;

  if (!query) Response.json(
      { error: "No :query provided" },
      {
        status: 400,
      }
    );

  const data = await TmdbApi.query(query);
  return Response.json({ data });
}
