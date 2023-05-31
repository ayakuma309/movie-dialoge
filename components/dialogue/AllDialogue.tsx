import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AllDialogueProps } from '../../types/MovieTypes';
import DialogueModal from './DialogueModal';


const AllDialogue = () => {
  const [movies, setMovies] = useState<AllDialogueProps[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollectionRef = collection(db, 'movies');
        const querySnapshot = await getDocs(moviesCollectionRef);
        const movieData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as AllDialogueProps;
          return { ...data, documentId: doc.id }; // ドキュメントのIDを追加する
        });
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className='dialogue'>
      <div>
        {movies &&
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <div key={movie.movie_id}>
              <DialogueModal
                documentId={movie.documentId}
                title={movie.title}
                dialogue={movie.dialogue}
                poster_path={movie.poster_path}
              />
            </div>
          ))}
        </div>
      }
      </div>
    </div>
  );
};

export default AllDialogue;
