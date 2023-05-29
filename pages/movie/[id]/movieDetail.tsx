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
          <div className='mx-auto'>
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
    </Layout>
  );
};

export default MovieNewDialogue;
