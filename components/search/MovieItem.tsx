import React, { useState } from 'react';
import { MovieItemProps } from '../../types/MovieTypes';
import MovieModal from './MovieModal';
import { NextPage } from 'next';

const MovieItem: NextPage<MovieItemProps> = ({ movies }) => {
  return (
    <div className="flex flex-wrap mx-auto">
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="card" key={movie.id}>
            <MovieModal
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              poster_path={movie.poster_path}
            />
          </div>
        ))}
    </div>
  );
};

export default MovieItem;
