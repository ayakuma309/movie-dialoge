import React, { useEffect, useState, useRef } from 'react';
import { AllDialogueProps } from '../../types/MovieTypes';
import DialogueModal from './DialogueModal';

import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

const AllDialogue = () => {
  const [movies, setMovies] = useState<AllDialogueProps[]>([]);
  const [lastMovie, setLastMovie] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginationFinished, setIsPaginationFinished] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const db = getFirestore();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollectionRef = collection(db, 'movies');
        const querySnapshot = await getDocs(query(moviesCollectionRef, orderBy('createdAt', 'desc'), limit(10)));
        const movieData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as AllDialogueProps;
          return { ...data, documentId: doc.id };
        });
        setMovies(movieData);
        if (querySnapshot.docs.length < 10) {
          setIsPaginationFinished(true);
        } else {
          setLastMovie(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies: ', error);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);



  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container === null || isLoading || isPaginationFinished) return;

    const rect = container.getBoundingClientRect();
    if (rect.top + rect.height > window.innerHeight) return;

    loadNextMovies();
  };

  const loadNextMovies = async () => {
    setIsLoading(true);
    try {
      const moviesCollectionRef = collection(db, 'movies');
      const querySnapshot = await getDocs(
        query(moviesCollectionRef, orderBy('createdAt', 'desc'), startAfter(lastMovie), limit(10))
      );
      const movieData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as AllDialogueProps;
        return { ...data, documentId: doc.id };
      });
      setMovies((prevMovies) => [...prevMovies, ...movieData]);
      if (querySnapshot.docs.length < 10) {
        setIsPaginationFinished(true);
      } else {
        setLastMovie(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, isPaginationFinished]);
  return (
    <div className='dialogue'>
      <div>
        {movies.length > 0 ? (
          <div className="flex flex-wrap justify-center" ref={scrollContainerRef}>
            {movies.map((movie) => (
              <div key={movie.documentId}>
                <DialogueModal
                  documentId={movie.documentId}
                  title={movie.title}
                  dialogue={movie.dialogue}
                  poster_path={movie.poster_path}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No movies to display.</p>
        )}

        {isLoading && <p>Loading...</p>}

        {isPaginationFinished && <p>No more movies to load.</p>}
      </div>
    </div>
  );
};
export default AllDialogue;
