import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";

export function usePersonInfoData(id: string) {
  const [data, setData] = useState<PersonInfo | null>(null);

  useEffect(() => {
    axios.get<PersonInfo>("/getPersonInfo", { params: { id: id.split("-").pop() } })
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        notifyError(err);
      });
  }, []);

  return { data };
}
