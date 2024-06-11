import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { useSearchParams } from "next/navigation";

export interface SearchResponse {
  titles: Result[];
  people: Person[];
}

export function useSearchData() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")!;
  const [data, setData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    setData(null);

    axios.get<SearchResponse>("/search", { params: { query } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        notifyError(err);
      });
  }, [query]);

  return { data };
}
