export interface IMovie {
    id: number,
    title: String,
    year: String,
    runtime: String,
    genres: String[],
    director: String,
    actors?: String,
    plot?: String,
    posterUrl?: String
}

export class Movie {
    private id: number;
    private title: String;
    private year: number;
    private runtime: number;
    private genres: String[];
    private director: String;
    private actors: String;
    private plot: String;
    private posterUrl: String;

    constructor(data: IMovie) {
        this.id = data.id;
        this.title = data.title;
        this.year = Number(data.year);
        this.runtime = Number(data.runtime);
        this.genres = data.genres;
        this.director = data.director;
        this.actors = data.actors ? data.actors : '';
        this.plot = data.plot ? data.plot : '';
        this.posterUrl = data.posterUrl ? data.posterUrl : '';
    }

    /**
     * Getter id
     * @return {number}
     */
    public get ID(): number {
        return this.id;
    }

    /**
     * Getter title
     * @return {String}
     */
    public get Title(): String {
        return this.title;
    }

    /**
     * Getter year
     * @return {number}
     */
    public get Year(): number {
        return this.year;
    }

    /**
     * Getter runtime
     * @return {number}
     */
    public get Runtime(): number {
        return this.runtime;
    }

    /**
     * Getter genres
     * @return {String[]}
     */
    public get Genres(): String[] {
        return this.genres;
    }

    /**
     * Getter director
     * @return {String}
     */
    public get Director(): String {
        return this.director;
    }

    /**
     * Getter actors
     * @return {String}
     */
    public get Actors(): String {
        return this.actors;
    }

    /**
     * Getter plot
     * @return {String}
     */
    public get Plot(): String {
        return this.plot;
    }

    /**
     * Getter posterUrl
     * @return {String}
     */
    public get PosterUrl(): String {
        return this.posterUrl;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set ID(value: number) {
        this.id = value;
    }

    /**
     * Setter title
     * @param {String} value
     */
    public set Title(value: String) {
        this.title = value;
    }

    /**
     * Setter year
     * @param {number} value
     */
    public set Year(value: number) {
        this.year = value;
    }

    /**
     * Setter runtime
     * @param {number} value
     */
    public set Runtime(value: number) {
        this.runtime = value;
    }

    /**
     * Setter genres
     * @param {String[]} value
     */
    public set Genres(value: String[]) {
        this.genres = value;
    }

    /**
     * Setter director
     * @param {String} value
     */
    public set Director(value: String) {
        this.director = value;
    }

    /**
     * Setter actors
     * @param {String} value
     */
    public set Actors(value: String) {
        this.actors = value;
    }

    /**
     * Setter plot
     * @param {String} value
     */
    public set Plot(value: String) {
        this.plot = value;
    }

    /**
     * Setter posterUrl
     * @param {String} value
     */
    public set PosterUrl(value: String) {
        this.posterUrl = value;
    }
}