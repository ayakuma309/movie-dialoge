import { useState } from 'react';
import MovieItem from "../components/search/MovieItem";
import { MovieInfo } from '../types/MovieTypes';
import { NextPage } from 'next';
import Layout from '@/components/common/Layout';
import { useUser } from '@/lib/auth';
import LoginForm from './loginForm';
import SearchForm from '@/components/search/SearchForm';

const SearchMovie: NextPage = () => {
    const user = useUser();
    if (!user) {
        return (
            <LoginForm />
        );
    }
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<MovieInfo[]>([]);

    return (
        <Layout title='Search'>
            <div className='container mx-auto mt-8 pb-16 text-black sm:max-w-xl md:max-w-2xl lg:max-w-4xl'>
                <SearchForm
                    query={query}
                    setQuery={setQuery}
                    setMovies={setMovies}
                />
                <MovieItem movies={movies} />
            </div>
        </Layout>
    );
};

export default SearchMovie;
