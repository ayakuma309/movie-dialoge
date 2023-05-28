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
  movie_id: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
}

export interface DialogueModalProps {
  title: string;
  dialogue: string;
  poster_path: string;
}
