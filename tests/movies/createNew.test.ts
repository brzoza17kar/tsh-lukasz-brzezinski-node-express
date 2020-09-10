import { expect } from 'chai';
const request = require("request");

const baseUrl = `http://localhost:4000/api`;

describe('Create Movie', function () {
    const exampleMovie = {
        "title": "The Dark Knight",
        "year": 2008,
        "runtime": 152,
        "genres": ["Action", "Crime", "Mystery"],
        "director": "Christopher Nolan",
        "actors": "Christian Bale, Michael Cane, Gary Oldman",
        "plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "posterUrl": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
    };

    it('Should create movie with full data', (done: Mocha.Done) => {
        request.post({
            uri: `${baseUrl}/movie`, body: exampleMovie, json: true
        }, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            expect(typeof body).to.equal('object');
            expect(body).to.haveOwnProperty('newMovie');
            expect(body.newMovie).to.haveOwnProperty('id');
            expect(body.newMovie.id).to.be.greaterThan(0);

            done();
        });
    });

    it('Should create movie with partial data', (done: Mocha.Done) => {
        const partialMovieData = {
            ...exampleMovie,
            actors: null,
            plot: "",
            posterUrl: undefined
        }

        request.post({
            uri: `${baseUrl}/movie`, body: partialMovieData, json: true
        }, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(200);

            expect(typeof body).to.equal('object');
            expect(body).to.haveOwnProperty('newMovie');

            expect(body.newMovie.actors).to.equal("");
            expect(body.newMovie.plot).to.equal("");
            expect(body.newMovie.posterUrl).to.equal("");

            done();
        });
    });

    it('Should not create movie with missing data', (done: Mocha.Done) => {
        const partialMovieData = {
            ...exampleMovie,
            title: ""
        }

        request.post({
            uri: `${baseUrl}/movie`, body: partialMovieData, json: true
        }, (error: any, response: any, body: any) => {
            expect(response.statusCode).to.equal(400);
            expect(body).to.contain('title should not be empty');

            done();
        });
    });
});