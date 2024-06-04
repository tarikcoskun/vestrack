import axios from "@/lib/axios";

export async function getHomeData() {
  const trending = await axios.get<Result[]>("/getTrending", { params: { type: "all", timeWindow: "day" } });
  const popularMovies = await axios.get<Result[]>("/getPopular", { params: { type: "movie" } });
  const popularSeries = await axios.get<Result[]>("/getPopular", { params: { type: "tv" } });

  return {
    trending: trending.data,
    popular: {
      movies: popularMovies.data,
      series: popularSeries.data,
    },
  };
}
