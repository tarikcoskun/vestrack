import axios from "@/lib/axios";

export function getMoviesData(type: "movie" | "tv") {
  const trending = axios
    .get("/getTrending", { params: { type } })
    .then((res) => res.data);
}
