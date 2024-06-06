import axios from "@/lib/axios";

export async function getMediaInfo(type: "movie" | "tv", id: string) {
  const res = await axios.get<MediaInfo & SeriesInfo>("/getMediaInfo", { params: { type, id: id.split("-").pop() } });
  return res.data;
}
