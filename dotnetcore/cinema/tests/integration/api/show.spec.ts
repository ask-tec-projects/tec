/// <reference types="cypress" />

import { HttpStatusCode } from "../../../src/lib/http_status_codes";

describe("Movie endpoint", () => {
    before(() => {
        cy.request("POST", "/api/seed/shows");
    });

    it("gets an empty show list", () => {
        cy.request("GET", "/api/shows").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    after(() => {
        cy.request("DELETE", "/api/seed/shows");
    });
});
