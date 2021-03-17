/// <reference types="cypress" />

import { HttpStatusCode } from "../../../src/lib/http_status_codes";
import { payloads } from "../../../src/lib/seed_payloads";

let seat_id: string;

describe("Seat endpoint", () => {
    before(() => {
        cy.request("POST", "/api/seed/seats");
    });

    it("gets an empty seat list", () => {
        cy.request("GET", "/api/seats").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    it("creates a new seat", () => {
        cy.request("POST", "/api/seats", { hall_id: payloads.hall.id, ...payloads.seat }).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.CREATED);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("number");
            expect(response.body.number).to.equal(payloads.seat.number);
            seat_id = response.body.id;
        });
    });

    it("gets the new seat", () => {
        cy.request("GET", "/api/seats").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
            expect(body[0].id).to.equal(seat_id);
        });
        cy.request("GET", `/api/seats/id/${seat_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.id).to.equal(seat_id);
            expect(body.number).to.equal(payloads.seat.number);
        });
    });

    it("deletes the new seat", () => {
        cy.request("DELETE", `/api/seats/id/${seat_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.NO_CONTENT);
        });
    });

    it("gets an empty seat list", () => {
        cy.request("GET", "/api/seats").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    after(() => {
        cy.request("DELETE", "/api/seed/seats");
    });
});
