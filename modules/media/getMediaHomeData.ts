import axios from "@/lib/axios";

export async function getMediaHomeData(type: "movie" | "tv") {
  const discover = await axios.get<Result[]>("/getDiscovery", { params: { type } });
  const trending = await axios.get<Result[]>("/getTrending", { params: { type: "all", timeWindow: "day" } });

  return {
    discover: discover.data,
    trending: trending.data,
  };
}
