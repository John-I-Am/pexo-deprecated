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
    cy.contains("Pexo - A modern spaced repetition system");
  });

  it("user can log in", function () {
    cy.contains("Join beta").click();
    cy.contains("here").click();
    cy.get("input:first").type("root1@root.com");
    cy.get("input:last").type("rootPass123");
    cy.contains("Login").click();

    cy.contains("Welcome back");
  });

  it("login fails with wrong password", function () {
    cy.contains("Join beta").click();
    cy.contains("here").click();
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
      cy.get("#nav_Editor").click();
      cy.contains("Decks").click();
      cy.contains("Create").click();
    });

    it("New Card can be created", function () {
      cy.get("#nav_Editor").click();
      cy.contains("Decks").click();
      cy.contains("untitled").click();

      cy.get("#add_card").click();

      cy.get("#cardEditor").within(() => {
        cy.get("#input_front").type("testing front", { force: true });
        cy.get("#input_back").type("testing back", { force: true });
        cy.get("#input_cloze").click({ force: true });
        cy.contains("Create").click({ force: true });
      });
    });

    it("Card can be edited", function () {
      cy.get("#nav_Editor").click();
      cy.contains("Decks").click();
      cy.contains("untitled").click();
      cy.get("#card-menu").trigger("mouseover");
      cy.get("#card-edit").click();
      cy.get("#input_front").type("edited front", { force: true });
      cy.get("#input_back").type("edited back", { force: true });
      cy.get("#create").click({ force: true });

      cy.get("body").click(0, 0);
    });

    it("demo deck can be added", function () {
      cy.get("#nav_Discover").click();
      cy.contains("Alphabet").parent().parent().within(() => {
        cy.contains("Add Deck").click();
      });
      cy.get("#nav_Editor").click();
    });
  });
});
