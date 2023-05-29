//myProfile.tsx
export interface MyProfileProps {
  documentId: string;
  movie_id: string;
  id: number;
  title: string;
  dialogue: string;
  poster_path: string;
  user_id: string;
}
//MyPostMovie.tsx
export interface MyPostMovieProps {
  movies:  MyProfileProps[];
}

//EditPostMovie.tsx
export interface EditPostMovieProps {
  documentId: string;
  title: string;
  dialogue: string;
  poster_path: string;
}
