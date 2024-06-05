import type { NextRequest } from "next/server";

import TmdbApi from "@/handlers/tmdb";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id") as string;

  if (!id) {
    Response.json(
      { error: "No :id provided" },
      { status: 400 },
    );
  }

  const data = await TmdbApi.getPersonInfo(id);
  return Response.json(data);
}
