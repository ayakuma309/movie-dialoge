import { useState, ChangeEvent, FormEvent } from 'react';
import MovieItem from "../components/search/MovieItem";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}
const SearchMovie = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);

    const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY
    const searchMovies = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=jp-JP&query=${query}&page=1`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
            } catch (err) {
            console.error(err);
            }
        };

        const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
        };

        return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">
                Movie Name
                </label>
                <input
                type="text"
                name="query"
                className="search-movie"
                placeholder="Search Movie"
                value={query}
                onChange={handleQueryChange}
                />
                <button className="search-button" type="submit">
                Search
                </button>
            </form>
            <MovieItem movies={movies} />
            </>
        );
    };

    export default SearchMovie;
