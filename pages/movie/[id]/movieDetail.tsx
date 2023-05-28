import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Layout from '@/components/common/Layout';
import { DialogueProps, movieImageProps } from '@/types/MovieTypes';
const MovieNewDialogue: NextPage = () => {
  const db = getFirestore();
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null); // 映画情報の状態
  const [movieDetail, setMovieDetail] = useState<DialogueProps>(); // 映画詳細情報の状態

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

  const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  //firebaseのデータ取得後にmovie.idを使いdetailのAPIで取得
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if(movie && movie.id){
          const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${APIKEY}&language=ja`;
          const res = await fetch(url);
          const data = await res.json();
          setMovieDetail(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const { title, poster_path, dialogue} = movie;
  return (
    <Layout title={title}>
      <div className='container mx-auto mt-8 pb-16 text-black sm:max-w-xl md:max-w-2xl lg:max-w-4xl'>
        <h1>{title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
          alt={title + ' poster'}
        />
        <h1 className='text-2xl'>{dialogue}</h1>
        {movieDetail && movieDetail.genres && (
          <div className='mx-auto'>
            <div className='flex flex-wrap'>
              {movieDetail.genres.map((genre: { name: string; id: string }) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <p>{movieDetail.overview}</p>
            <p className='text-xl'>{movieDetail.tagline}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MovieNewDialogue;
