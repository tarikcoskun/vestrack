import axios from "@/lib/axios";

export async function getHomeData(type: "movie" | "tv") {
  const trending = await axios.get<Result[]>("/getTrending", { params: { type } });
  const discovery = await axios.get<Result[]>("/getDiscovery", { params: { type } });

  return {
    trending: trending.data,
    discovery: discovery.data,
  };
}
