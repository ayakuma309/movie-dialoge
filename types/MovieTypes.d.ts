//Search.tsx
export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
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
  overview: string;
}

//AllDialogue.tsx
export interface AllDialogueProps {
  documentId: string;
  movie_id: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
  createdAt: string;
}
//DialogueModal.tsx
export interface DialogueModalProps {
  documentId: string;
  title: string;
  dialogue: string;
  poster_path: string;
}


//movieDetail.tsx
export interface DialogueProps {
  documentId: string;
  movie_id: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
  overview: string;
  createdAt: string;
}
