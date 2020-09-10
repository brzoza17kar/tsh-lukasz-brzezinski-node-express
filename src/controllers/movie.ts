import { MoviesQueryDto } from './../models/movie_dto';
import { Movie, IMovie } from './../models/movie';
import { Database } from './db';

function createMovie(body: IMovie): Promise<Movie> {
    const newMovie = new Movie(body);
    return Database.saveMovie(newMovie);
}

function getMovies(query: MoviesQueryDto): Movie[] {
    if (query.runtime !== undefined) {
        query.runtime = Number(query.runtime);
    }

    if (query.genres !== undefined) {
        return getMoviesFromGenres(query.genres, query.runtime);
    } else {
        const movies = [];
        const randomMovie = getRandomMovie(query.runtime);

        if (randomMovie) {
            movies.push(randomMovie)
        }

        return movies;
    }
}

function getMoviesFromGenres(genres: string[], runtime?: number): Movie[] {
    let movies = Database.getMovies();

    if (runtime !== undefined) {
        movies = movies.filter(movie => isMovieRuntimeInRequestRange(runtime, movie.Runtime));
    }

    return movies.filter(movie => {
        return genresCountInMovie(genres, movie) > 0;
    }).sort((a, b) => {
        const genresInA = genresCountInMovie(genres, a);
        const genresInB = genresCountInMovie(genres, b);

        return genresInA < genresInB ? 1 : -1;
    });
}

function genresCountInMovie(genres: String[], movie: Movie): number {
    return genres.filter(requestGenre => movie.Genres.indexOf(requestGenre) > -1).length;
}

function getRandomMovie(runtime?: number): Movie {
    let movies = Database.getMovies();

    if (runtime !== undefined) {
        movies = movies.filter(movie => isMovieRuntimeInRequestRange(runtime, movie.Runtime));
    }

    return pickRandomMovie(movies);
}

function isMovieRuntimeInRequestRange(requestRuntime: number, movieRuntime: number): boolean {
    const minRuntime = Math.max(requestRuntime - 10, 0);
    const maxRuntime = requestRuntime + 10;

    return movieRuntime >= minRuntime && movieRuntime <= maxRuntime;
}

function pickRandomMovie(movies: Movie[]): Movie {
    return movies[Math.floor(Math.random() * movies.length)];
}

export default {
    createMovie,
    getMovies
}