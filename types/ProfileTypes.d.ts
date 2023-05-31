//MyPostMovie.tsx
export interface MyPostMovieProps {
  documentId: string;
  movie_id: string;
  id: number;
  title: string;
  dialogue: string;
  poster_path: string;
  user_id: string;
}

//EditPostMovie.tsx
export interface EditPostMovieProps {
  documentId: string;
  title: string;
  dialogue: string;
  poster_path: string;
  onDelete: (documentId: string) => void;
}
