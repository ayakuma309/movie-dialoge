import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import MovieItem from "../components/search/MovieItem";
import { MovieInfo } from '../types/MovieTypes';
import { NextPage } from 'next';
import Layout from '@/components/common/Layout';

const SearchMovie: NextPage = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<MovieInfo[]>([]);

    const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

    const searchMovies = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=ja&query=${query}&page=1`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
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
        <Layout title='Search'>
            <div className='container mx-auto mt-8 pb-16 text-black sm:max-w-xl md:max-w-2xl lg:max-w-4xl'>
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
                    <button
                        className="text-amber-600 px-6 py-2 rounded-md bg-amber-100 hover:bg-amber-200"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
                <MovieItem movies={movies} />
            </div>
        </Layout>
    );
};

export default SearchMovie;
