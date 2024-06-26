import axios from "axios";

export interface ExtendedPersonInfo extends PersonInfo {
  known_for: (PersonCast & PersonCrew)[];
}

class TmdbHandler {
  apiKey = process.env.TMDB_API_KEY;

  async fetch<T>(url: string) {
    const urlConstruct = new URL(`http://api.themoviedb.org/3${url}`);
    urlConstruct.searchParams.append("api_key", this.apiKey);

    const res = await axios.get<T>(urlConstruct.toString());
    return res.data;
  }

  async getPopular(type: "movie" | "tv") {
    const { results } = await this.fetch<TmdbApiResponse>(`/${type}/popular`);
    return results;
  }

  async getTopRated(type: "movie" | "tv") {
    const { results } = await this.fetch<TmdbApiResponse>(`/${type}/top_rated`);
    return results;
  }

  async getUpcoming(type: "movie" | "tv") {
    const { results } = await this.fetch<TmdbApiResponse>(`/${type}/upcoming`);
    return results;
  }

  async getDiscovery(type: "movie" | "tv") {
    const { results } = await this.fetch<TmdbApiResponse>(`/discover/${type}?sort_by=popularity.desc`);
    return results;
  }

  async getTrending(type: "all" | "movie" | "tv" | "person", timeWindow: "day" | "week") {
    const { results } = await this.fetch<TmdbApiResponse>(`/trending/${type}/${timeWindow}`);
    return results;
  }

  async getMediaInfo(type: "movie" | "tv", mediaId: string) {
    const data = await this.fetch<MediaInfo>(`/${type}/${mediaId}?append_to_response=credits,reviews,videos,recommendations`);
    return data;
  }

  async getPersonInfo(personId: string) {
    const { combined_credits, ...data } = await this.fetch<PersonInfo>(`/person/${personId}?append_to_response=combined_credits,external_ids`);

    const knownFor = [...combined_credits.cast, ...combined_credits.crew].reduce((arr: Partial<(PersonCast & PersonCrew)>[], curr: Partial<(PersonCast & PersonCrew)>) => {
      if (!arr.map((item) => (item.title || item.name)).includes(curr.title || curr.name)) arr.push(curr);
      return arr;
    }, []);

    return {
      ...data,
      known_for: knownFor,
    };
  }

  async query(query: string) {
    const data = await this.fetch<{ results: Result[] }>(`/search/multi?query=${query}`).then((res) => res.results);

    const getRelevancyScore = (title: string) => {
      const lowTitle = title.toLowerCase();
      const lowQuery = query.toLowerCase();

      if (lowTitle === lowQuery) return 3;
      else if (lowTitle.startsWith(lowQuery)) return 2;
      else if (lowTitle.includes(lowQuery)) return 1;
      else return 0;
    };

    const sortFunc = (a: Result, b: Result) => (getRelevancyScore(b.title || b.name!) * 100 + b.popularity) - (getRelevancyScore(a.title || a.name!) * 100 + a.popularity);
    const filterFunc = (item: Result) => item.poster_path;

    const movies = data
      ?.filter((item) => item.media_type === "movie")
      ?.filter(filterFunc);

    const series = data
      ?.filter((item) => item.media_type === "tv")
      ?.filter(filterFunc);

    const titles = [...movies, ...series].sort(sortFunc);

    const people = data
      ?.filter((item) => item.media_type === "person")
      ?.sort(sortFunc);

    return {
      titles,
      people,
    };
  }
}

const handler = new TmdbHandler();
export default handler;
