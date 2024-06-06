import axios from "@/lib/axios";

export async function getMediaHomeData(type: "movie" | "tv") {
  const trending = await axios.get<Result[]>("/getTrending", { params: { type, timeWindow: "day" } });
  const popular = await axios.get<Result[]>("/getPopular", { params: { type } });

  return {
    trending: trending.data,
    popular: popular.data,
  };
}
