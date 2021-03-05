/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import { HttpStatusCode } from "../../../src/lib/http_status_codes";

let hall_id: string;

describe("Hall endpoint", () => {
    it("gets an empty hall list", () => {
        cy.request("GET", "/api/halls").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    it("creates a new hall", () => {
        cy.request("POST", "/api/halls", test_objects.payloads.hall).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.CREATED);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
            expect(response.body.name).to.equal(test_objects.payloads.hall.name);
            hall_id = response.body.id;
        });
    });

    it("gets the new hall", () => {
        cy.request("GET", "/api/halls").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
            expect(body[0].id).to.equal(hall_id);
        });
        cy.request("GET", `/api/halls/id/${hall_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.id).to.equal(hall_id);
            expect(body.name).to.equal(test_objects.payloads.hall.name);
        });
    });

    it("deletes the new hall", () => {
        cy.request("DELETE", `/api/halls/id/${hall_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.NO_CONTENT);
        });
    });

    it("gets an empty hall list", () => {
        cy.request("GET", "/api/halls").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });
});
