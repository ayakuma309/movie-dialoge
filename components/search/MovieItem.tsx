import React from 'react';
import { MovieInfo } from '../../types/MovieTypes';

interface MovieItemProps {
  movies: MovieInfo[];
}

const MovieItem: React.FC<MovieItemProps> = ({ movies }) => {
  return (
    <div className="card-list">
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              alt={movie.title + ' poster'}
              className="card--img"
            />
            <div className="card-content">
              <h3 className="card--title">{movie.title}</h3>
              <p>
                <small>Release date : {movie.release_date} </small>
              </p>
              <p>
                <small>Rating : {movie.vote_average} </small>
              </p>
              <p className="card--description">{movie.overview}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieItem;
