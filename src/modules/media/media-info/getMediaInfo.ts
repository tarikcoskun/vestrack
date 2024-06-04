import axios from "@/lib/axios";

export async function getMediaInfo(id: string, type: "movie" | "tv") {
  const res = await axios.get<MovieInfo & SeriesInfo>("/getMediaInfo", { params: { type, id: id.split("-").pop() } });
  return res.data;
}
