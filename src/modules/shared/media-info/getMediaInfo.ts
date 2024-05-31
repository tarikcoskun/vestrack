import axios from "@/lib/axios";

export function getMediaInfo(id: string, type: "movie" | "tv") {
  return axios
    .get<MovieInfo & SeriesInfo>("/getMediaInfo", { params: { type, id: id.split("-").pop() } })
    .then((res) => res.data);
}
