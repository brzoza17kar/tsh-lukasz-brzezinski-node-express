import { NewMovieDto, MoviesQueryDto } from './../models/movie_dto';
import { RoutesInput } from "../types/route";
import MovieController from "../controllers/movie";
import { validateRequest } from "../controllers/validation";
import { RequestValidationField } from '../enums/RequestValidationField';

export default ({ app }: RoutesInput) => {
    app.get("/api/movies/", validateRequest(MoviesQueryDto, RequestValidationField.QUERY), (req, res) => {
        const movies = MovieController.getMovies(res.locals.input);
        res.send({ movies: movies });
    });

    app.post("/api/movie", validateRequest(NewMovieDto), async (req, res) => {
        const newMovie = await MovieController.createMovie(req.body);
        res.send({ newMovie });
    });
}