import axios from "@/lib/axios";

export interface SearchResponse {
  titles: Result[];
  people: Person[];
}

export async function getSearchData(query: string) {
  const res = await axios.get<SearchResponse>("/search", { params: { query } });
  return res.data;
}
