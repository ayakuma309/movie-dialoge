import React from 'react'
import { NextPage } from 'next';
import { MyPostMovieProps } from '../../types/ProfileTypes';
import EditPostMovie from './EditPostMovie';

const MyPostMovie: NextPage<MyPostMovieProps> = ({ movies }) => {
  return (
    <div className="flex flex-col mx-auto justify-center text-center">
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="mx-auto" key={movie.id}>
            <EditPostMovie
              documentId={movie.documentId}
              title={movie.title}
              dialogue={movie.dialogue}
              poster_path={movie.poster_path}
            />
          </div>
        ))}
    </div>
  )
}

export default MyPostMovie
