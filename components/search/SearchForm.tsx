import React, { ChangeEvent, useEffect } from 'react'
import { MovieInfo } from '@/types/MovieTypes';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  setMovies: (movies: MovieInfo[]) => void;
}
const SearchForm = ({ query, setQuery, setMovies }: Props) => {

  const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=ja&query=${query}&page=1`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    } catch (err) {
        console.error(err);
    }
};

useEffect(() => {
    searchMovies();
}, [query]); // queryの値が変更されたときに検索を実行

const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
};
  return (
    <div>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            searchMovies();
        }}
        className='mx-auto w-[350px] sm:w-full flex mb-3 '
      >
        <input
          type="text"
          name="query"
          className='w-full rounded-md  p-6 bg-white text-black'
          placeholder="Search Movie"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </div>
  )
}

export default SearchForm
