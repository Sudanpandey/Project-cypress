import { config } from "../../../config/index";
describe("Login", () => {
  it.only("Login Success with Valid Login Details", function () {
    cy.login();
    cy.logout();
  });

  it("Log in with Valid Email Address Only", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Log in with Valid Password Only", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Log in with Invalid Email Address and Password", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Log in with Invalid Email Address and valid Password", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Log in with valid Email Address and Invalid Password", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Log in with Empty Email Address and Password field", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });

  it("Trying to visit dashboard page without login", function () {
    cy.visit(config.app.base_url);
    cy.url().should("contain", config.app.base_url);
  });
});
