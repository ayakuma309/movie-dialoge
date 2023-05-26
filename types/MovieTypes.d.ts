export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
export interface MovieItemProps {
  movies: MovieInfo[];
}

interface MovieModalProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}
