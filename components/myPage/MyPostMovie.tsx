import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import { MyPostMovieProps } from '../../types/ProfileTypes';
import EditPostMovie from './EditPostMovie';
import { collection,  getDocs, getFirestore } from "firebase/firestore";
import { useUser } from '@/lib/auth';

const MyPostMovie: NextPage = () => {
  const user = useUser();
  const db = getFirestore();
  const [movies, setMovies] = useState<MyPostMovieProps[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollectionRef = collection(db, 'movies');
        const querySnapshot = await getDocs(moviesCollectionRef);
        const movieData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as MyPostMovieProps;
          return { ...data, documentId: doc.id };
        });

        // ログインしているユーザーのIDと一致する映画だけフィルタリングする
        if (user) {
          const filteredMovies = movieData.filter((movie) => movie.user_id === user.uid);
          setMovies(filteredMovies);
        }
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
    };

    fetchMovies();
  }, []);

  //削除する
  const handleDelete = (documentId: string) => {
    const updatedMovies = movies.filter((movie) => movie.documentId !== documentId);
    setMovies(updatedMovies);
  };
  return (
    <div className="flex flex-col mx-auto justify-center text-center">
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="mx-auto" key={movie.id}>
            <EditPostMovie
              onDelete={handleDelete}
              documentId={movie.documentId}
              title={movie.title}
              dialogue={movie.dialogue}
              poster_path={movie.poster_path}
            />
          </div>
        ))}
    </div>
  )
}

export default MyPostMovie
