// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getBySel", (selector, ...args) =>
  cy.get(`[data-test=${selector}]`, ...args)
);
Cypress.Commands.add("getMultipleBySel", (selector, index, ...args) =>
  cy.get(`[data-test=${selector}][data-test-index=${index}]`, ...args)
);
Cypress.Commands.add("getAndfindBySel", (getSelector, findSelector) =>
  cy.get(`[data-test=${getSelector}]`).find(`[data-test=${findSelector}]`)
);
Cypress.Commands.add(
  "getMultipleAndFindBySel",
  (getSelector, getIndex, findSelector) =>
    cy
      .get(`[data-test=${getSelector}][data-test-index=${getIndex}]`)
      .find(`[data-test=${findSelector}]`)
);

// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: any[]): Chainable<Element>;
    getMultipleBySel(
      selector: string,
      index: number,
      ...args: any[]
    ): Chainable<Element>;
    getAndfindBySel(
      getSelector: string,
      findSelector: string
    ): Chainable<Element>;
    getMultipleAndFindBySel(
      getSelector: string,
      getIndex: number,
      findSelector: string
    ): Chainable<Element>;
    takeToken(): Chainable<Element>;
    login(): Chainable<Element>;
    waitLoading(): Chainable<Element>;
    checkConfirmationMsg(msg: string): Chainable<Element>;
    addAccountMockRoutes(): Chainable<Element>;
    addLoginMockRoutes(): Chainable<Element>;
    addAllAgendaDataMockRoute(date: string): Chainable<Element>;
    addFeedbackMappingMockRoutes(): Chainable<Element>;
    addEventsHistoryMockRoute(): Chainable<Element>;
    addInitialAttendaceMockRoutes(
      salesmanType: "INTERNAL" | "EXTERNAL"
    ): Chainable<Element>;
    mockGeolocation(accuracyValue: number): Chainable<Element>;
  }
}
