import React from 'react';
import { MovieItemProps } from '../../types/MovieTypes';
import MovieModal from './MovieModal';
import { NextPage } from 'next';

const MovieItem: NextPage<MovieItemProps> = ({ movies }) => {
  return (
    <div className="flex flex-wrap mx-auto justify-center">
      {movies && movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="card_movie mx-auto" key={movie.id}>
            <MovieModal
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
            />
          </div>
        ))}
    </div>
  );
};

export default MovieItem;
