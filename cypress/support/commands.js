// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// **********************************************
import { config } from "../../config/index";
import Login_PO from "../support/pageObjects/Login_PO";


    
//Login
const login_PO = new Login_PO();

// Cypress.Commands.add("login", () => {
//     login_PO
//         .visitSite()
//         .fillCredentials()
//         .clickOnLoginButton()
//         .validationAfterLogin()
// });
Cypress.Commands.add("login", () => {
  cy.session("login", () => {
    login_PO
      .visitSite()
      .fillCredentials()
      .clickOnLoginButton()
      .validationAfterLogin();
  });
});
//Logout
Cypress.Commands.add("logout", () => {
    cy.get('.admin-img').click();
    cy.get('.mdi-logout-variant').should('be.visible').click();
    cy.url().should("contain", config.app.base_url);
    cy.title().should('eq', 'Client Portal');
});