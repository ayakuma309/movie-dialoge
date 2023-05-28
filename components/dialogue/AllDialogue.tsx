import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AllDialogueProps } from '../../types/MovieTypes';
import DialogueModal from './DialogueModal';


const AllDialogue = () => {
  const [movies, setMovies] = useState<AllDialogueProps[]>([]);
  const [randomMovies, setRandomMovies] = useState<AllDialogueProps[]>([]);
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

  useEffect(() => {
    if (movies.length > 0) {
      const shuffledmovies = [...movies];
      for (let i = shuffledmovies.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledmovies[i], shuffledmovies[j]] = [shuffledmovies[j], shuffledmovies[i]];
      }
      setRandomMovies(shuffledmovies);
    }
  }, [movies]);
  return (
    <div className='dialogue'>
      <div className="flex flex-wrap">
        {randomMovies &&
        <div>
          {randomMovies.map((movie) => (
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
