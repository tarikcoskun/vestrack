import type { ExtendedPersonInfo } from "@/handlers/tmdb";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function usePersonInfoData(id: string) {
  const [data, setData] = useState<ExtendedPersonInfo | null>(null);

  useEffect(() => {
    axios.get<ExtendedPersonInfo>("/getPersonInfo", { params: { id: id.split("-").pop() } })
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return { data };
}
