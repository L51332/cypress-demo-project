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

Cypress.Commands.add('login', (username, password) => {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button').click();
});

Cypress.Commands.add('logout', ()=>{
    cy.get('.button').should('have.text', " Logout").click();
});

Cypress.Commands.add('checkPhoneFormatValues', (textToType, fieldAppearance, valueSectionReadout) => {
    cy.get('input[placeholder="Enter phone number"]').type(textToType);
    cy.get('input[placeholder="Enter phone number"]').should('have.attr', 'value', fieldAppearance);
    cy.get('p').eq(2).contains(valueSectionReadout).should('be.visible');
    cy.get('input[placeholder="Enter phone number"]').clear();
});

Cypress.Commands.add('checkPhoneFormatValuesNoCountry', (textToType, fieldAppearance, valueSectionReadout) => {
    cy.get('input[placeholder="Enter phone number"]').type(textToType);
    cy.get('input[placeholder="Enter phone number"]').should('have.attr', 'value', fieldAppearance);
    cy.get('p').eq(1).contains(valueSectionReadout).should('be.visible');
    cy.get('input[placeholder="Enter phone number"]').clear();
});

