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
import "cypress-file-upload";

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
  cy.get(".admin-img").click();
  cy.get(".mdi-logout-variant").should("be.visible").click();
  cy.url().should("contain", config.app.base_url);
  cy.title().should("eq", "Client Portal");
});

Cypress.Commands.add("waitForLoader", () => {
  cy.get(".loader-site", { timeout: 30000 }).should("not.exist");
});

//File upload
Cypress.Commands.add(
  "uploadDynamicImage",
  (numFiles, fileInputSelector, fileUploadSelector) => {
    //File uploading
    const images = [
      "1.pdf",
      "2.pdf",
      "3.pdf",
      "4.pdf",
      "5.pdf",
      "6.pdf",
      "7.pdf",
    ];
    // Generate random indices
    const randomIndices = Array.from({ length: numFiles }, () =>
      Math.floor(Math.random() * images.length)
    );
    // Select and store the random images
    const selectedImages = randomIndices.map((index) => images[index]);
    // Click the "Choose Files" button and upload the selected images
    cy.get(fileInputSelector).then((input) => {
      selectedImages.forEach((imageName) => {
        cy.fixture(imageName, "binary")
          .then(Cypress.Blob.binaryStringToBlob)
          .then((blob) => {
            // const testFile = new File([blob], imageName, { type: 'application/pdf' });
            const testFile = new File([blob], imageName, {
              type: "application/pdf",
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            const fileInput = input[0];
            fileInput.files = dataTransfer.files;
            cy.wrap(input).trigger("change", { force: true });
          });
      });
    });
    // Assert the selected images
    selectedImages.forEach((imageName) => {
      cy.get(fileUploadSelector).should("contain", imageName);
    });
  }
);

Cypress.Commands.add("uploadImageInspections", (fileNames, selector) => {
  fileNames.forEach((fileName) => {
    cy.fixture(fileName)
      .then(Cypress.Blob.base64StringToBlob)
      .then((fileContent) => {
        cy.get(selector).attachFile(
          { fileContent, fileName, mimeType: "image/png" },
          { subjectType: "drag-n-drop", force: true }
        );
      });
  });
});
Cypress.Commands.add("drawInCanvas", (element, index, x, y, x1, x2, y1, y2) => {
  cy.get(element)
    .eq(index)
    .trigger("mouseover", x, y, { force: true, log: false })
    .click(x, y, { force: true })
    .click(x1, y1, { force: true })
    .dblclick(x2, y2, { force: true })
    .wait(1000);
});
Cypress.Commands.add(
  "createContactPersonWithNoCompany",
  (fName, sName, userName, emailAddress, contactPersonName) => {
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Contacten')`).click();
    cy.get("a.nav-item.nav-link span.nav-text")
      .contains("Opdrachtgevers")
      .click();
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuwe contactpersoon")
      .click();
    cy.get('input[required="required"].form-control').eq(0).type(fName);
    cy.get('input[required="required"].form-control').eq(1).type(sName);
    cy.get('input[required="required"].form-control').eq(2).type(userName);
    cy.get("select.form-control").eq(0).select("Man");
    cy.get('input[required="required"].form-control').eq(3).type(emailAddress);
    cy.get(".btn-secondary").should("contain", "Bevestig").click();
    cy.get("tbody>tr:nth-child(1)").should("contain", contactPersonName);
  }
);
Cypress.Commands.add(
  "createContactPersonWithCompany",
  (
    fName,
    sName,
    userName,
    emailAddress,
    name,
    address,
    zipCode,
    cityName,
    companyEmailAddress,
    companyName
  ) => {
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Contacten')`).click();
    cy.get("a.nav-item.nav-link span.nav-text")
      .contains("Opdrachtgevers")
      .click();
    cy.get('a.card-header-tab:contains("Bedrijf")').click();
    //Create contact person
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw contactpersoon")
      .click();
    cy.get('input[required="required"].form-control').eq(0).type(fName);
    cy.get('input[required="required"].form-control').eq(1).type(sName);
    cy.get('input[required="required"].form-control').eq(2).type(userName);
    cy.get("select.form-control").eq(0).select("Man");
    cy.get('input[required="required"].form-control').eq(3).type(emailAddress);
    //Create company
    cy.get("select.select-multiple.form-control").select(
      "Voeg een nieuw bedrijf toe"
    );
    cy.get("select.form-control").eq(2).select("Staging admin");
    cy.get('input[required="required"].form-control').eq(4).type(name);
    cy.get('input[required="required"].form-control').eq(5).type(address);
    cy.get('input[required="required"].form-control').eq(6).type(zipCode);
    cy.get('input[required="required"].form-control').eq(7).type(cityName);
    cy.get('input[required="required"].form-control')
      .eq(8)
      .type(companyEmailAddress);
    cy.get('input[required="required"].form-control').eq(9).type("567654");
    cy.get(".btn-secondary").should("contain", "Bevestig").click();
    cy.get('a.card-header-tab:contains("Bedrijf")').click();
    cy.get("tbody>tr:nth-child(1)").should("contain", name);
  }
);
//Create new admin
Cypress.Commands.add(
  "createAdmin",
  (userName, firstName, surName, emailAddress) => {
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Contacten')`).click();
    cy.get("a.nav-item.nav-link span.nav-text").contains("Beheerders").click();
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuwe admin")
      .click();
    cy.get('input[required="required"].form-control').eq(0).type(userName);
    cy.get('input[required="required"].form-control').eq(1).type(firstName);
    cy.get('input[required="required"].form-control').eq(2).type(surName);
    cy.get('input[required="required"].form-control').eq(3).type(emailAddress);
    cy.get("select.form-control").eq(0).select("Man");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    // cy.get('.alert').should('contain','username is al bezet.');
    cy.get(".notification-title").click();
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      `${firstName} ${surName}`
    );
  }
);

//Create New project
Cypress.Commands.add("createNewProject", (pName, cName) => {
  cy.get(".sidebar-lock-switch > .mdi").click();
  cy.get(`li:contains('Objecten')`).click();
  cy.get("a.card-header-tab.tab-project").click();
  cy.get('div[class="d-none d-sm-block"]')
    .should("contain", "Nieuw project")
    .click();
  cy.get("div.form-group.form-group-focus input.form-control")
    .eq(0)
    .type(pName);
  cy.get("div.form-group.form-group-focus input.form-control")
    .eq(1)
    .type(cName);
  cy.get("#ownerType").select("Geen");
  cy.get("#ownerType").should("contain", "Geen");
  cy.get('button[type="submit"].btn.btn-secondary').click();
  cy.get(".notification-content").should(
    "contain",
    "The project was successfully added"
  );
  cy.get(".notification-title").click();
  cy.get("tbody>tr:nth-child(1)").should("contain", pName);
});
