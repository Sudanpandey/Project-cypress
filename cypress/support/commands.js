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

Cypress.Commands.add("waitForLoader",()=>{
    cy.get('.loader-site',{timeout:30000}).should('not.exist');
})

//dynamic file upload
Cypress.Commands.add("uploadDynamicImage", (numFiles, fileInputSelector, fileUploadSelector) => {
  //File uploading 
  const Images = ['1.pdf', '2.pdf', '3.pdf', '4.pdf', '5.pdf', '6.pdf', '7.pdf'];
  // Generate random indices
  const randomIndices = Array.from({ length: numFiles}, () => Math.floor(Math.random() * Images.length));
  // Select and store the random images
  const selectedImages = randomIndices.map((index) => Images[index]);
  // Click the "Choose Files" button and upload the selected images
  cy.get(fileInputSelector).then((input) => {
  selectedImages.forEach((imageName) => {
      cy.fixture(imageName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
          const testFile = new File([blob], imageName, { type: 'application/pdf' });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          const fileInput = input[0];
          fileInput.files = dataTransfer.files;
          cy.wrap(input).trigger('change', { force: true });
      });
      });
  });
  // Assert the selected images
  selectedImages.forEach((imageName) => {
  cy.get(fileUploadSelector).should('contain', imageName);
  });
});
