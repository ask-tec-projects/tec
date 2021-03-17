/// <reference types="cypress" />

import { HttpStatusCode } from "../../../src/lib/http_status_codes";
import { payloads } from "../../../src/lib/seed_payloads";

let movie_id: string;

describe("Movie endpoint", () => {
    before(() => {
        cy.request("POST", "/api/seed/movies");
    });

    it("gets an empty movie list", () => {
        cy.request("GET", "/api/movies").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    it("creates a new movie", () => {
        cy.request("POST", "/api/movies", {
            ...payloads.movie,
            director_id: payloads.director.id,
            genres: [payloads.genre.id],
        }).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.CREATED);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("title");
            expect(response.body).to.have.property("description");
            expect(response.body).to.have.property("minimum_age");
            expect(response.body).to.have.property("director_id");
            expect(response.body.title).to.equal(payloads.movie.title);
            expect(response.body.description).to.equal(payloads.movie.description);
            expect(response.body.release_date).to.equal(payloads.movie.release_date);
            expect(response.body.minimum_age).to.equal(payloads.movie.minimum_age);
            expect(response.body.director_id).to.equal(payloads.director.id);
            movie_id = response.body.id;
        });
    });

    it("gets the new movie", () => {
        cy.request("GET", "/api/movies").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
        });
        cy.request("GET", `/api/movies/genre/${payloads.genre.id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
        });
        cy.request("GET", `/api/movies/id/${movie_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.id).to.equal(movie_id);
            expect(body.genres[0].id).to.equal(payloads.genre.id);
            expect(body.genres[0].name).to.equal(payloads.genre.name);
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
        cy.request("DELETE", "/api/seed/movies");
    });
});
