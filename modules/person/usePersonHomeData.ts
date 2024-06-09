import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function usePersonHomeData() {
  const [data, setData] = useState<Result[] | null>(null);

  useEffect(() => {
    axios.get<Result[]>("/getPopular", { params: { type: "person" } })
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return { data };
}
