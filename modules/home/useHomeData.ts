import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function useHomeData() {
  const [trendingData, setTrendingData] = useState<Result[] | null>(null);
  const [popularMoviesData, setPopularMoviesData] = useState<Result[] | null>(null);
  const [popularSeriesData, setPopularSeriesData] = useState<Result[] | null>(null);

  useEffect(() => {
    axios.get<Result[]>("/getTrending", { params: { type: "all", timeWindow: "day" } })
      .then((res) => {
        setTrendingData(res.data);
      }).catch((err) => {
        notifyError(err);
      });

    axios.get<Result[]>("/getPopular", { params: { type: "movie" } })
      .then((res) => {
        setPopularMoviesData(res.data);
      }).catch((err) => {
        notifyError(err);
      });

    axios.get<Result[]>("/getPopular", { params: { type: "tv" } })
      .then((res) => {
        setPopularSeriesData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return {
    trendingData,
    popularMoviesData,
    popularSeriesData,
  };
}
