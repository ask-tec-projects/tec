/// <reference types="cypress" />

describe("Forms", () => {
    beforeEach(() => {
        cy.visit("/admin");
    });

    it("registers a genre", () => {
        cy.get("h1").contains("Genre").click();
        cy.get(".form.genre input[name='name']").type("Genre #1");
        cy.get(".form.genre button").click();
        cy.get(".notification").contains("Genre added").should("exist");
        cy.get("h1").contains("Genre").click();
    });

    it("registers a director", () => {
        cy.get("h1").contains("Director").click();
        cy.get(".form.director input[name='first_name']").type("Director");
        cy.get(".form.director input[name='last_name']").type("#1");
        cy.get(".form.director input[type='date']").type("1990-01-01");
        cy.fixture("tile.png").then((file) => {
            cy.get(".form.director input[type='file']").attachFile({
                fileContent: file.toString(),
            });
        });
        cy.get(".form.director button").click();
        cy.get(".notification").contains("Director added").should("exist");
        cy.get("h1").contains("Director").click();
    });

    it("registers a movie", () => {
        cy.get("h1").contains("Movie").click();
        cy.get(".form.movie input[name='title']").type("Movie #1");
        cy.get(".form.movie textarea").type("Description");
        cy.get(".form.movie input[type='date']").type("1990-01-01");
        cy.get(".form.movie input[type='number']").clear().type("18");
        cy.get(".form.movie select.genre").select("Genre #1");
        cy.get(".form.movie select.director").select("Director #1");
        cy.fixture("tile.png").then((file) => {
            cy.get(".form.movie input[type='file']").attachFile({
                fileContent: file.toString(),
            });
        });
        cy.get(".form.movie button").contains("Submit").click();
        cy.get(".notification").contains("Movie added").should("exist");
        cy.get("h1").contains("Movie").click();
    });
});
