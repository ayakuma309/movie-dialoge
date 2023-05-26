import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AllDialogueProps } from '../../types/MovieTypes';
import DialogueModal from './DialogueModal';


const AllDialogue = () => {
  const [movies, setMovies] = useState<AllDialogueProps[]>([]); // Movie型を使用する
  const db = getFirestore();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollectionRef = collection(db, 'movies');
        const querySnapshot = await getDocs(moviesCollectionRef);
        const movieData = querySnapshot.docs.map((doc) => doc.data() as AllDialogueProps);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies: ', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='flex '>
      {movies.map((movie) => (
        <div key={movie.id}>
          <DialogueModal
            title={movie.title}
            dialogue={movie.dialogue}
            poster_path={movie.poster_path}
          />
        </div>
      ))}
    </div>
  );
};

export default AllDialogue;
