import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Layout from '@/components/common/Layout';


const MovieNewDialogue: NextPage = () => {
  const db = getFirestore();
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null); // 映画情報の状態

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, dialogue} = movie;
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
        alt={title + ' poster'}
      />
      <p>{dialogue}</p>
    </Layout>
  );
};

export default MovieNewDialogue;
