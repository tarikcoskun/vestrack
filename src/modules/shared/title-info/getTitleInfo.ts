import axios from "@/lib/axios";

export function getTitleInfo(id: string, type: "movie" | "tv") {
  /*
  return new Promise<MovieInfo>((resolve) => {
    resolve(movieinfo as MovieInfo);
  });
  */

  return axios
    .get<MovieInfo & ShowInfo>("/getTitleInfo", { params: { type, id: id.split("-").pop() } })
    .then((res) => res.data);
}
