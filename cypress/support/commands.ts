/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable eol-last */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login({ email, password }): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add("login", ({ email, password }: any) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    email, password,
  }).then((response) => {
    localStorage.setItem("currentUser", JSON.stringify(response.body));
    const authorization = `bearer ${response.body.token}`;

    const options = {
      method: "POST",
      url: "http://localhost:3001/api/decks",
      headers: {
        authorization,
      },
    };
    const options2 = {
      method: "POST",
      url: "http://localhost:3001/api/cards",
      headers: {
        authorization,
      },
      body: {
        deckId: 1,
        front: "front",
        back: "back",
        examples: [],
        tags: [],
        type: "classic",
      },
    };

    cy.request(options);
    cy.request(options2);
    cy.visit("http://localhost:3000/main/dashboard");
  });
});