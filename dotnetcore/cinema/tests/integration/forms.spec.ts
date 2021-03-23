/// <reference types="cypress" />

describe("Forms", () => {
    beforeEach(() => {
        cy.visit("/admin");
    });

    it("registers a genre", () => {
        cy.get(".form.genre input[name='name']").type("Genre #1");
        cy.get(".form.genre button").click();
        cy.get(".notification").contains("Genre added").should("exist");
    });

    it("registers a director", () => {
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
    });

    it("registers a movie", () => {
        cy.get(".form.movie input[name='title']").type("Movie #1");
        cy.get(".form.movie textarea").type("Description");
        cy.get(".form.movie input[type='date']").type("1990-01-01");
        cy.get(".form.movie input[type='number']").type("18");
        cy.fixture("tile.png").then((file) => {
            cy.get(".form.movie input[type='file']").attachFile({
                fileContent: file.toString(),
            });
        });
        cy.get(".form.movie button").click();
        cy.get(".notification").contains("Movie added").should("exist");
    });
});
