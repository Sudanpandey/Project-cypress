// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

/*
cy.on('uncaught:exception', (error) => {
  if (error.message.includes('Request failed with status code 429')) {
    // Handle Request failed with status code 429
    cy.log('Request failed with status code 429');
    // Additional error handling logic
  } else if (error.message.includes("Cannot read properties of undefined")) {
    // Handle TypeError: Cannot read properties of undefined
    cy.log('TypeError: Cannot read properties of undefined');
    // Additional error handling logic
  } else if (error.message.includes("Avoided redundant navigation")) {
    // Handle NavigationDuplicated
    cy.log('NavigationDuplicated: Avoided redundant navigation');
    // Additional error handling logic
  } else {
    // Handle other types of errors
    cy.log('Unhandled exception:', error.message);
    // Additional error handling logic
  }

  // Prevent the exception from failing the test
  return false;
});

// Your Cypress test code continues here...
*/
