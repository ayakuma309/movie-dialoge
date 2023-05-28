//Search.tsx
export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
}

//MovieItem.tsx
export interface MovieItemProps {
  movies: MovieInfo[];
}

//MovieModal.tsx
export interface MovieModalProps {
  id: number;
  title: string;
  poster_path: string;
}

//AllDialogue.tsx
export interface AllDialogueProps {
  movie_id: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
}
//DialogueModal.tsx
export interface DialogueModalProps {
  title: string;
  dialogue: string;
  poster_path: string;
}
//movieDetail.tsx
export interface DialogueProps {
  genres: string[
    {
      id: number;
      name: string;
    }
  ];
  overview: string;
  tagline: string;
}

export interface movieImageProps {
  id: number;
  backdrops: [
    {
      file_path: string;
    }
  ];
}
