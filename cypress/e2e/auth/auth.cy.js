import { config } from "../../../config/index";
describe("Login", () => {
    it.only("Login Success with Valid Login Details", function () {
        cy.login();
        cy.logout();
    });

    it("Log in with Valid Email Address Only", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear().type(config.app.email);
        cy.get('#password').should('be.visible').clear();
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Log in with Valid Password Only", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear();
        cy.get('#password').should('be.visible').clear().type(config.app.password);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Log in with Invalid Email Address and Password", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear().type("admin");
        cy.get('#password').should('be.visible').clear().type("admin");
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Log in with Invalid Email Address and valid Password", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear().type("admin");
        cy.get('#password').should('be.visible').clear().type(config.app.password);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Log in with valid Email Address and Invalid Password", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear().type(config.app.email);
        cy.get('#password').should('be.visible').clear().type("admin");
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Log in with Empty Email Address and Password field", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.title().should('eq', 'Insurance Broker System - Login');
        cy.get('#email').should('be.visible').clear();
        cy.get('#password').should('be.visible').clear();
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in").click();
        cy.get('span > b').should('be.visible').should('have.text', "Enter your Email address and password correct");
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });

    it("Trying to visit dashboard page without login", function () {
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        cy.visit("https://demo.guru99.com/insurance/v1/header.php");
        cy.get('#email').should('be.visible').clear();
        cy.get('#password').should('be.visible').clear();
        cy.url().should("contain", config.app.base_url);
        cy.get(':nth-child(3) > .btn').should('be.visible').should('have.value', "Log in");
    });


})
