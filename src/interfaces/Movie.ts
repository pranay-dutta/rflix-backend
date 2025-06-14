export default interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
