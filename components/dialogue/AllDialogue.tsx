import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AllDialogueProps } from '../../types/MovieTypes';


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
          <img
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              alt={movie.title + ' poster'}
              className="mx-auto"
            />
          <h1>{movie.title}</h1>
          <p>{movie.dialogue}</p>
        </div>
      ))}
    </div>
  );
};

export default AllDialogue;
