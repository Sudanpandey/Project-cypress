import { config } from "../../../config/index";

class Login_PO {

    visitSite(){
        cy.visit(config.app.base_url);
        cy.url().should("contain", config.app.base_url);
        // cy.title().should('eq', 'Qaasaa - Portal');

        return this;
    }
    
    fillCredentials() {
        cy.get('#email').should('be.visible').clear().type(config.app.email);
        cy.get('#password').should('be.visible').clear().type(config.app.password);
        return this;
    }

    clickOnLoginButton() {
        cy.get('button[type="submit"]').should('be.visible').click();

        return this;
    }

    validationAfterLogin(){
        cy.url().should("contain", "/app/home#/");
        cy.title().should('eq', 'Qaasaa - Portal',{ timeout:80000 });
    }
}

export default Login_PO;