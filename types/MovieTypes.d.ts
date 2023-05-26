export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}
export interface MovieItemProps {
  movies: MovieInfo[];
}

export interface MovieModalProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface AllDialogueProps {
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
}
