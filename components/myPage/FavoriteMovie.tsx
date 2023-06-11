import { useUser } from '@/lib/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
interface MovieProps {
  documentId: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
  likes: LikeProps[];
}

interface LikeProps {
  userId: string;
}

const FavoriteMovie = () => {
  const user = useUser();
  const db = getFirestore();
  const [moviesWithLikes, setMoviesWithLikes] = useState<MovieProps[]>([]);

  useEffect(() => {
    const fetchMoviesWithLikes = async () => {
      try {
        const moviesCollectionRef = collection(db, 'movies');
        const moviesQuerySnapshot = await getDocs(moviesCollectionRef);

        const moviesWithLikesData: MovieProps[] = [];

        for (const movieDoc of moviesQuerySnapshot.docs) {
          const movieData = movieDoc.data() as MovieProps;

          // likesサブコレクションの参照を取得
          const likesCollectionRef = collection(db, 'movies', movieDoc.id, 'likes');
          const likesQuerySnapshot = await getDocs(likesCollectionRef);

          const likesData = likesQuerySnapshot.docs.map((likeDoc) => {
            const likeData = likeDoc.data() as LikeProps;
            return { ...likeData };
          });

          const movieWithLikesData: MovieProps = {
            documentId: movieDoc.id,
            id: movieData.id,
            title: movieData.title,
            dialogue: movieData.dialogue,
            poster_path: movieData.poster_path,
            likes: likesData,
          };

          moviesWithLikesData.push(movieWithLikesData);
        }

        setMoviesWithLikes(moviesWithLikesData);
      } catch (error) {
        console.error('Error fetching movies with likes:', error);
      }
    };

    fetchMoviesWithLikes();
  }, []);


  return (
    <div className='container'>
      {moviesWithLikes.map((movie) => (
        <div className="mx-auto text-black card_movie" key={movie.id}>
          {movie.title}<br/>
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
            alt={movie.title + ' poster'}
            className="mx-auto"
          />
          {movie.dialogue}<br/>
        </div>
      ))}
    </div>
  );
};

export default FavoriteMovie;
