import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { DialogueProps } from '@/types/MovieTypes';
import { CommentTypeProps } from '@/types/CommentTypes';
import Layout from '@/components/common/Layout';
import { useUser } from '@/lib/auth';
import { TextField } from '@mui/material';
import MovieComments from '@/components/movieDetail/MovieComments';
const MovieNewDialogue: NextPage = () => {
  const user = useUser();
  const db = getFirestore();
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null); // 映画情報の状態
  const [movieDetail, setMovieDetail] = useState<DialogueProps>(); // 映画詳細情報の状態
  // コメント一覧の状態
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentTypeProps[]>([]);

  const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const docRef = doc(db, 'movies', id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const movieData = docSnap.data();
            setMovie(movieData);
          } else {
            console.log('Movie not found');
          }
        }
      } catch (error) {
        console.error('Error fetching movie: ', error);
      }
    };

    //firebaseのデータ取得後にmovie.idを使いdetailのAPIで取得
    const fetchMovieDetail = async () => {
      try {
        if (movie && movie.id) {
          const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${APIKEY}&language=ja`;
          const res = await fetch(url);
          const data = await res.json();
          setMovieDetail(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchMovie(), fetchMovieDetail()]);

      const unsubscribe = onSnapshot(
        query(collection(db, 'movies', id as string, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              text: doc.data().text,
              avatar: doc.data().avatar,
              username: doc.data().username,
              timestamp: doc.data().timestamp,
            }))
          );
        }
      );

      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, [movie, id]);


  if (!movie) {
    return <div>Loading...</div>;
  }
  const { title, poster_path, dialogue} = movie;

  //コメント新規投稿
  const newComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'movies', id as string, 'comments'), {
        text: comment,
        timestamp: Date.now(),
        username: user.displayName,
      });
      setComment("");
      console.log(comment);
      console.log('コメントが正常に保存されました');
    } catch (error) {
      console.error('コメントの保存中にエラーが発生しました:', error);
    }
  };


  return (
    <Layout title={title}>
      <div className='container mx-auto mt-8 pb-16 text-black sm:max-w-xl md:max-w-2xl lg:max-w-4xl'>
        <h1 className='my-5 text-2xl font-bold'>{title}</h1>
        <div className='text-center card'>
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
            alt={title + ' poster'}
            className='mx-auto'
            />
        </div>
        <h1 className='text-2xl mt-5 mb-5 font-bold'>「{dialogue}」</h1>
        {movieDetail && movieDetail.genres && (
          <div className='w-9/12 mx-auto'>
            <div className='flex flex-wrap mb-7'>
              {movieDetail.genres.map((genre: { name: string; id: string }) => (
                <p
                  key={genre.id}
                  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                >
                  {genre.name}
                </p>
              ))}
            </div>
            <p>{movieDetail.overview}</p>
            <p className='text-xl'>{movieDetail.tagline}</p>
          </div>
        )}
      </div>
      <div className='mb-5 flex justify-center'>
        <form onSubmit={newComment}>
          <div>
            <TextField
              type="text"
              placeholder="Type new comment..."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
            />
            <button
              disabled={!comment}
              type="submit"
              className='disabled:opacity-50 bg-blue-900 text-white py-2 px-4 rounded-md'
            >
              コメントする
            </button>
          </div>
        </form>
        <MovieComments comments={comments} />
      </div>
    </Layout>
  );
};

export default MovieNewDialogue;
