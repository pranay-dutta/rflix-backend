import { Genre } from "./Genre";
import { ProductionCompany } from "./ProductionCompany";
interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number; //starts from 0
  vote_average: number;
}
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TvSeriesDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: 1551830;
    name: "The Iron Throne";
    overview: "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.";
    vote_average: 4.809;
    vote_count: 241;
    air_date: "2019-05-19";
    episode_number: 6;
    production_code: "806";
    runtime: 80;
    season_number: 8;
    show_id: 1399;
    still_path: "/zBi2O5EJfgTS6Ae0HdAYLm9o2nf.jpg";
  };
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
