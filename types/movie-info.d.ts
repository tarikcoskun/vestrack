interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: OriginCountry[];
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
  reviews: Reviews;
  videos: Videos;
  recommendations: Recommendations;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Credits {
  cast: Cast[];
  crew: Cast[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

interface Genre {
  id: number;
  name: string;
}

enum OriginCountry {
  Us = "US",
}

enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Hu = "hu",
  Ja = "ja",
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: OriginCountry;
}

interface ProductionCountry {
  iso_3166_1: OriginCountry;
  name: string;
}

interface Recommendations {
  page: number;
  results: Recommendation[];
  total_pages: number;
  total_results: number;
}

interface Recommendation {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  adult: boolean;
  title: string;
  original_language: OriginalLanguage;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

enum MediaType {
  Movie = "movie",
}

interface Reviews {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

interface Videos {
  results: Video[];
}

interface Video {
  iso_639_1: OriginalLanguage;
  iso_3166_1: OriginCountry;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: Type;
  official: boolean;
  published_at: string;
  id: string;
}

enum Site {
  YouTube = "YouTube",
}

enum Type {
  BehindTheScenes = "Behind the Scenes",
  Clip = "Clip",
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}
