import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc,  getFirestore, onSnapshot,  query } from 'firebase/firestore';
import { CommentTypeProps } from '@/types/CommentTypes';
import Layout from '@/components/common/Layout';
import { useUser } from '@/lib/auth';
import { TextField } from '@mui/material';
import MovieComments from '@/components/movieDetail/MovieComments';
import { RotatingLines } from 'react-loader-spinner';
const MovieNewDialogue: NextPage = () => {
  const user = useUser();
  const db = getFirestore();
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null); // 映画情報の状態
  // コメント一覧の状態
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentTypeProps[]>([]);

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
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = onSnapshot(
        query(collection(db, 'movies', id as string, 'comments')),
        (snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              text: doc.data().text,
              username: doc.data().username,
            }))
          );
        }
      );

      return () => {
        unsubscribe();
      };
    };
    fetchData();
  }, [id]);


  if (!movie) {
    return (
      <div className="my-24 mx-auto" style={{ textAlign: 'center', height: '500px' }}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  const { title, poster_path, dialogue, overview } = movie;

  //コメント新規投稿
  const newComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'movies', id as string, 'comments'), {
        text: comment,
        username: user.displayName,
      });
      setComment("");
      // ここらへんもtoast使ってもよいかもですね、どっかで使っていたはず
      console.log('コメントが正常に保存されました');
    } catch (error) {
      console.error('コメントの保存中にエラーが発生しました:', error);
    }
  };


  return (
    <Layout title={title}>
      <div className='container mx-auto mt-8 pb-16  sm:max-w-xl md:max-w-2xl lg:max-w-4xl'>
        <h1 className='my-5 text-3xl font-bold text-white'>{title}</h1>
        <div className='text-center card_movie_detail'>
          <img
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
            alt={title + ' poster'}
            className='mx-auto'
            />
        <h1 className='text-2xl mt-5 mb-5 font-bold'>「{dialogue}」</h1>
        <p>{overview}</p>
        </div>
      </div>
      <div className='mb-5 flex justify-center'>
        <form onSubmit={newComment}>
          <div>
            <TextField
              type="text"
              placeholder="Type new comment..."
              value={comment}
              className='bg-white rounded-md'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
            />
            <button
              disabled={!comment}
              type="submit"
              className='disabled:opacity-50 bg-white text-black py-4 px-2 ml-2 rounded-md'
            >
              コメントする
            </button>
          </div>
        </form>
      </div>
      <MovieComments comments={comments} />
    </Layout>
  );
};

export default MovieNewDialogue;
