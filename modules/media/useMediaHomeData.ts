import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function useMediaHomeData(type: "movie" | "tv") {
  const [discoverData, setDiscoverData] = useState<Result[] | null>(null);
  const [trendingData, setTrendingData] = useState<Result[] | null>(null);

  useEffect(() => {
    axios.get<Result[]>("/getDiscovery", { params: { type } })
      .then((res) => {
        setDiscoverData(res.data);
      }).catch((err) => {
        notifyError(err);
      });

    axios.get<Result[]>("/getTrending", { params: { type, timeWindow: "day" } })
      .then((res) => {
        setTrendingData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return {
    discoverData,
    trendingData,
  };
}
