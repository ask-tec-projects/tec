/// <reference types="cypress" />

describe("Authentication", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("registers a user", () => {
        cy.get("header .item").contains("Register").click();
        cy.get(".modal-body h1").contains("Register").should("exist");
        cy.get(".modal-body input[name='first_name']").type("User");
        cy.get(".modal-body input[name='last_name']").type("Test");
        cy.get(".modal-body input[name='email']").type("test@user.dev");
        cy.get(".modal-body input[name='password']").type("password");
        cy.get(".modal-body input[name='date_of_birth']").type("1985-01-01");
        cy.get(".modal-body input[name='is_administrator']").check();
        cy.get(".modal-body button.login").click();

        cy.get(".notification").contains("User registered").should("exist");
        cy.get(".modal-body").should("not.exist");

        cy.get("header .item").contains("Register").click();
        cy.get(".modal-body h1").contains("Register").should("exist");
        cy.get(".modal-body input[name='first_name']").type("User");
        cy.get(".modal-body input[name='last_name']").type("Test");
        cy.get(".modal-body input[name='email']").type("test@user.dev");
        cy.get(".modal-body input[name='password']").type("password");
        cy.get(".modal-body input[name='date_of_birth']").type("1985-01-01");
        cy.get(".modal-body input[name='is_administrator']").check();
        cy.get(".modal-body button.login").click();

        cy.get(".modal-body").should("not.exist");
        cy.get(".notification").contains("Unable to register the user").should("exist");
    });

    it("logs a user in", () => {
        cy.get("header .item").contains("Login").click();
        cy.get(".modal-body h1").contains("Login").should("exist");
        cy.get(".modal-body input[name='email']").type("test@user.dev");
        cy.get(".modal-body input[name='password']").type("password");
        cy.get(".modal-body button.login").click();

        cy.get(".modal-body").should("not.exist");
        cy.get(".notification").contains("Login successful").should("exist");

        cy.get("header .item").contains("Login").click();
        cy.get(".modal-body h1").contains("Login").should("exist");
        cy.get(".modal-body input[name='email']").type("test@user.dev");
        cy.get(".modal-body input[name='password']").type("wrong password");
        cy.get(".modal-body button.login").click();

        cy.get(".modal-body").should("not.exist");
        cy.get(".notification").contains("Invalid credentials").should("exist");
    });
});
