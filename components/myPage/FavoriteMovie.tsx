import { useUser } from '@/lib/auth';
import { collection,  deleteDoc,  doc,  getDocs, getFirestore, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MovieProps {
  documentId: string;
  id: string;
  title: string;
  dialogue: string;
  poster_path: string;
  likes: LikeProps[];
}

interface LikeProps {
  documentId: string;
  userId: string;
}

const FavoriteMovie = () => {
  const user = useUser();
  const db = getFirestore();
  const [moviesWithLikes, setMoviesWithLikes] = useState<MovieProps[]>([]);

  useEffect(() => {
    const fetchMoviesWithLikes = async () => {
      try {
        // moviesコレクションの参照
        const moviesCollectionRef = collection(db, 'movies');
        const moviesQuerySnapshot = await getDocs(moviesCollectionRef);

        const moviesWithLikesData: MovieProps[] = [];

        //for文でmoviesコレクションの中身でループ
        for (const movieDoc of moviesQuerySnapshot.docs) {
          const movieData = movieDoc.data() as MovieProps;

          // likesサブコレクションの参照を取得
          const likesCollectionRef = collection(db, 'movies', movieDoc.id, 'likes');
          const likesQuerySnapshot = await getDocs(likesCollectionRef);

          const likesData: LikeProps[] = [];
          likesQuerySnapshot.forEach((likeDoc) => {
            const likeData = likeDoc.data() as LikeProps;
            const likeWithId: LikeProps = {
              documentId: likeDoc.id,
              userId: likeData.userId
            };
            likesData.push(likeWithId);
          });
          // すでにいいねしているかの判定
          const currentUserLikes = likesData.filter((like) => like.userId === user?.uid);

          if (currentUserLikes.length > 0) {
            const movieWithLikesData: MovieProps = {
              documentId: movieDoc.id,
              id: movieData.id,
              title: movieData.title,
              dialogue: movieData.dialogue,
              poster_path: movieData.poster_path,
              likes: currentUserLikes,
            };
            moviesWithLikesData.push(movieWithLikesData);
          }
        }

        setMoviesWithLikes(moviesWithLikesData);
      } catch (error) {
        console.error('Error fetching movies with likes:', error);
      }
    };

    fetchMoviesWithLikes();
  }, [user]);


  //いいね削除機能
  const deleteLike = async (movieId: string, likeId: string) => {
    if (!user) return;
    if (window.confirm('いいねを削除しますか?')) {
      try {
        await deleteDoc(doc(db, 'movies', movieId, 'likes', likeId));

        // いいね削除後、moviesWithLikesから該当movieを削除する
        setMoviesWithLikes((prevMovies) =>
          prevMovies.filter((movie) => {
            //現在の映画が削除されたいいねの対象であるかをチェック
            if (movie.documentId === movieId) {
              //映画のいいねリストから削除されたいいねをフィルタリング
              const updatedLikes = movie.likes.filter((like) => like.documentId !== likeId);
              //いいねが残っているかどうかをチェックしてもしいいねが残っていればtrueを返し、映画を保持。
              return updatedLikes.length > 0;
            }
            return true; // 映画を保持する
          })
          //もしいいねが残っていなければfalseを返し、映画がフィルタリングされる。
        );
      } catch (error) {
        console.error('Error deleting like:', error);
      }
    }
  };

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
          {movie.likes.map((like) => (
            <FavoriteIcon
              color="secondary"
              key={like.documentId}
              onClick={() => deleteLike(movie.documentId, like.documentId)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FavoriteMovie;
