interface PersonInfo {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: string | null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  external_ids: ExternalIDS;
  combined_credits: CombinedCredits;
}

interface ExternalIDS {
  freebase_mid: string | null;
  freebase_id: string | null;
  imdb_id: string | null;
  tvrage_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

interface CombinedCredits {
  cast: PersonCast[];
  crew: PersonCrew[];
}

interface PersonCast {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order?: number;
  media_type: "movie" | "tv";
  origin_country?: string[];
  original_name?: string;
  first_air_date?: Date;
  name?: string;
  episode_count?: number;
}

interface PersonCrew {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: MediaType;
}
