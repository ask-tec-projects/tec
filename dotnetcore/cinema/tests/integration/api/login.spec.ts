/// <reference types="cypress" />

import { HttpStatusCode } from "../../../src/lib/http_status_codes";
import { payloads } from "../../../src/lib/seed_payloads";

describe("Login endpoint", () => {
    before(() => {
        cy.request("POST", "/api/seed/login");
    });

    it("logs a user in", () => {
        cy.request("POST", "/api/login", { email: payloads.user.email, password: payloads.user.password }).then(
            (response) => {
                expect(response.status).to.equal(HttpStatusCode.OK);
                expect(response.body.token.length).to.equal(36);
            },
        );
    });

    after(() => {
        cy.request("DELETE", "/api/seed/login");
    });
});
