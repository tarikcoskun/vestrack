import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function useMediaInfoData(type: "movie" | "tv", id: string) {
  const [data, setData] = useState<(MediaInfo & SeriesInfo) | null>(null);

  useEffect(() => {
    axios.get<MediaInfo & SeriesInfo>("/getMediaInfo", { params: { type, id: id.split("-").pop() } })
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return { data };
}
