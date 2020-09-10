import { expect } from 'chai';
const request = require("request");

const baseUrl = `http://localhost:4000/api`;

describe('Get Movies', function () {
    it('Should return one random movie with no params', (done: Mocha.Done) => {
        request(`${baseUrl}/movies`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            const _body = JSON.parse(body);

            expect(_body).to.haveOwnProperty('movies');
            expect(_body.movies.length).to.equal(1);

            done();
        });
    });

    it('Should return one random movie with duration', (done: Mocha.Done) => {
        request(`${baseUrl}/movies?runtime=95`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            const _body = JSON.parse(body);

            expect(_body).to.haveOwnProperty('movies');
            expect(_body.movies.length).to.equal(1);
            const movie = _body.movies[0];

            expect(movie.runtime).to.be.greaterThan(84).and.to.be.lessThan(106);

            done();
        });
    });

    it('Should return multiple random movies within genres', (done: Mocha.Done) => {
        request(`${baseUrl}/movies?genres[]=Drama&genres[]=Horror`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            const _body = JSON.parse(body);

            expect(_body).to.haveOwnProperty('movies');
            expect(_body.movies.length).to.be.greaterThan(1);

            const inputGenres = ["Drama", "Horror"];

            const movies = _body.movies;

            const firstMovieGenresOverlap = movies[0].genres.filter(
                (genre: string) => inputGenres.indexOf(genre) > -1
            ).length;
            const lastMovieGenresOverlap = movies[movies.length - 1].genres.filter(
                (genre: string) => inputGenres.indexOf(genre) > -1
            ).length;

            expect(firstMovieGenresOverlap >= lastMovieGenresOverlap).to.be.true;

            done();
        });
    });

    it('Should return multiple random movies within genres and with runtime', (done: Mocha.Done) => {
        request(`${baseUrl}/movies?runtime=95&genres[]=Drama&genres[]=Horror`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            const _body = JSON.parse(body);

            expect(_body).to.haveOwnProperty('movies');
            expect(_body.movies.length).to.be.greaterThan(1);

            const inputGenres = ["Drama", "Horror"];

            const movies = _body.movies;

            for (let movie of movies) {
                expect(inputGenres.some(genre => movie.genres.indexOf(genre) > -1)).to.be.true;
                expect(movie.runtime).to.be.greaterThan(84).and.to.be.lessThan(106);
            }

            done();
        });
    });

    it('Should return no movies due to low duration', (done: Mocha.Done) => {
        request(`${baseUrl}/movies?runtime=5`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            const _body = JSON.parse(body);

            expect(_body).to.haveOwnProperty('movies');
            expect(_body.movies.length).to.equal(0);

            done();
        });
    });

    it('Should return error due to incorrect genre', (done: Mocha.Done) => {
        request(`${baseUrl}/movies?genres[]=Drama&genres[]=YourTestFails`, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(400);
            expect(body).to.contain('Genres should be selected from the existing ones')

            done();
        });
    });
});