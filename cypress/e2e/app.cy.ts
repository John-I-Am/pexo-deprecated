/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
describe("App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "root",
      surname: "rootsur",
      email: "root1@root.com",
      password: "rootPass123",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("A Modern Spaced Repetition System");
  });

  it("user can log in", function () {
    cy.contains("Log in").click();
    cy.get("input:first").type("root1@root.com");
    cy.get("input:last").type("rootPass123");
    cy.contains("Login").click();

    cy.contains("Welcome back");
  });

  it("login fails with wrong password", function () {
    cy.contains("Log in").click();
    cy.get("input:first").type("ro11@root.com");
    cy.get("input:last").type("wrongPassword");
    cy.contains("Login").click();

    cy.contains("Incorrect Login");
  });

  describe("After user logs in with existing 1 deck with 1 card", function () {
    beforeEach(function () {
      cy.login({ email: "root1@root.com", password: "rootPass123" });
    });

    it("New Deck can be created", function () {
      cy.get("#nav_editor").click();
      cy.contains("New").click();
    });

    // it("New Card can be created", function () {
    //   cy.get("#nav_editor").click();
    //   cy.contains("All").click();
    //   cy.contains("untitled").click();

    //   cy.contains("New Card").parent().within(() => {
    //     cy.get("svg").click();
    //   });

    //   cy.get("#cardEditor").within(() => {
    //     cy.get("#input_front").type("testing front", { force: true });
    //     cy.get("#input_back").type("testing back", { force: true });
    //     cy.get("#input_cloze").click();
    //     cy.contains("Create").click();
    //   });

    //   cy.contains("Total Cards: 2");
    // });

    // it("Card can be edited", function () {
    //   cy.get("#nav_editor").click();
    //   cy.contains("untitled").click();
    //   cy.get("#edit").click();
    //   cy.get("#input_front").type("edited front", { force: true });
    //   cy.get("#input_back").type("edited back", { force: true });
    //   cy.get("#create").click({ force: true });

    //   cy.get("body").click(0, 0);
    //   cy.contains("Total Cards: 1");
    //   cy.contains("edited front");
    // });

    // it("demo deck can be added", function () {
    //   cy.get("#discover").click();
    //   cy.contains("Alphabet").parent().parent().within(() => {
    //     cy.contains("Add Deck").click();
    //   });
    //   cy.get("#nav_editor").click();
    //   cy.contains("All").click();
    //   cy.contains("Total Cards: 27");
    // });
  });
});

// cy.get('.error').should('contain', 'wrong credentials')
// cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
// cy.get('.error').should('have.css', 'border-style', 'solid')
