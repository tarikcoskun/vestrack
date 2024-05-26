import axios from "@/lib/axios";

export interface SearchResponse {
  titles: Result[];
  people: Person[];
}

export function getSearchData(query: string) {
  return axios
    .get<SearchResponse>("/search", { params: { query } })
    .then((res) => res.data);
}
