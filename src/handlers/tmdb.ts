import axios from "axios";

export interface ExtendedMovieInfo extends Result {
  credits: {
    cast: Cast[];
    crew: Cast[];
  };
  reviews: {
    results: Review[];
  };
  videos: {
    results: Video[];
  };
  recommendations: Recommendations;
}

interface ExtendedPersonInfo extends PersonInfo {
  combined_credits: {
    cast: ExtendedMovieInfo[];
    crew: ExtendedMovieInfo[];
  };
}

class TmdbHandler {
  apiKey = process.env.TMDB_API_KEY;

  async fetch<T>(url: string) {
    const urlConstruct = new URL("http://api.themoviedb.org/3" + url);
    urlConstruct.searchParams.append("api_key", this.apiKey);

    const res = await axios.get<T>(urlConstruct.toString());
    return res.data;
  }

  async getTrending(type: "movie" | "tv" | "people") {
    const { results } = await this.fetch<TmdbApiResponse>(
      `/trending/${type}/week`
    );

    return results;
  }

  async getMovieInfo(movieId: string, type: "movie" | "tv" = "movie") {
    const data = await this.fetch<ExtendedMovieInfo>(
      `/${type}/${movieId}?append_to_response=credits,reviews,videos,recommendations`
    );

    return data;
  }

  async getActor(actorId: string) {
    const { combined_credits, ...data } = await this.fetch<ExtendedPersonInfo>(
      `/person/${actorId}?append_to_response=combined_credits`
    );

    const sortedCast = [...(combined_credits?.cast || [])]
      .filter((item) => item.media_type === "movie")
      .sort((a, b) => b.popularity - a.popularity);

    return {
      ...data,
      cast: sortedCast?.slice(0, 6) || [],
    };
  }

  async getDiscovery() {
    const res = await this.fetch<{ results: DiscoveryResult[]; }>("/discover/movie");
    return res.results;
  }

  async query(query: string) {
    const data = await this.fetch<{ results: Result[] }>(
      `/search/multi?query=${query}`
    ).then((res) => res.results);

    const sortFunc = (a: Result, b: Result) => b.popularity - a.popularity;
    const filterFunc = (item: Result) => item.poster_path;

    const movies = data
      ?.filter((item) => item.media_type === "movie")
      ?.sort(sortFunc)
      ?.filter(filterFunc);

    const series = data
      ?.filter((item) => item.media_type === "tv")
      ?.sort(sortFunc)
      ?.filter(filterFunc);

    const people = data
      ?.filter((item) => item.media_type === "person")
      ?.sort(sortFunc);

    return {
      movies,
      series,
      people,
    };
  }
}

const handler = new TmdbHandler();
export default handler;
