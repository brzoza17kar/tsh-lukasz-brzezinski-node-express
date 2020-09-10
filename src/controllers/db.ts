import { Movie } from './../models/movie';
import * as fs from 'fs';
import * as path from 'path';

class DB {
    private genres: String[];
    private movies: Movie[] = [];
    private lastMovieId: number;
    private dbPath = path.join(__dirname, '../assets/db.json');

    constructor() {
        const data = this.getDBFile();
        this.genres = data.genres;

        for (let movie of data.movies) {
            this.movies.push(new Movie(movie));
        }

        this.lastMovieId = Math.max.apply(Math, this.movies.map((movie) => { return movie.ID; }));
    }

    public getGenres() {
        return this.genres;
    }

    public getMovies() {
        return this.movies;
    }

    public async saveMovie(movie: Movie): Promise<Movie> {
        movie.ID = ++this.lastMovieId;
        this.movies.push(movie);

        const dbFile = this.getDBFile();
        dbFile.movies.push(movie);
        this.saveDBFile(dbFile);

        return movie;
    }

    private getDBFile(): any {
        const file = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(file);
    }

    private saveDBFile(data: any) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }
}

class Singleton {
    private static instance: DB;

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new DB();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

const Database = new Singleton().getInstance();

export {
    Database
}
