/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import {HttpStatusCode} from "../../../src/lib/http_status_codes";

let director_id: string;
let genre_id: string;
let movie_id: string;

describe("Movie endpoint", () => {
    before(() => {
        cy.request("POST", "/api/directors", test_objects.payloads.director).then((response) => {
            director_id = response.body.id;
        });
        cy.request("POST", "/api/genres", test_objects.payloads.genre).as("genre").then((response) => {
            console.log(response.body)
            genre_id = response.body.id;
        });
        cy.request("POST", "/api/movies", { ...test_objects.payloads.movie, director_id, genres: [genre_id] }).then((response) => {
            movie_id = response.body.id;
        });
    });

    it("gets an empty movie list", () => {
        cy.request("GET", "/api/movies").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });


    it("gets the new movie", () => {
        cy.request("GET", "/api/movies").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
        });
        cy.request("GET", `/api/movies/genre/${genre_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
        });
        cy.request("GET", `/api/movies/id/${movie_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.id).to.equal(movie_id);
            expect(body.genres[0].id).to.equal(genre_id);
            expect(body.genres[0].name).to.equal(test_objects.payloads.genre.name);
        });
    });

    it("deletes the new movie", () => {
        cy.request("DELETE", `/api/movies/id/${movie_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.NO_CONTENT);
        });
    });

    it("gets an empty movie list", () => {
        cy.request("GET", "/api/movies").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    after(() => {
        cy.request("DELETE", `/api/directors/id/${director_id}`);
        cy.request("DELETE", `/api/genres/id/${genre_id}`);
});
