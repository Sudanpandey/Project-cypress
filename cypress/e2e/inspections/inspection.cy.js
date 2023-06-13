describe("Login", () => {
    it("Login Success with Valid Login Details", function () {
        cy.login();
        // cy.logout();
        // Click objecten 
        cy.get(`li:contains('Objecten')`).click();
        cy.get(`td[data-title="Locatie"]`).should('be.visible').first().click();
        //**to do update test logic using alternative logic
        cy.get('.tab-bar .nav-pills li.nav-item a.nav-link').contains('Inspecties').click();
        // cy.get('.col-auto a.btn.btn-outline-primary').contains('Nieuwe Inspectie').click();
        cy.contains('Nieuwe Inspectie').click();
        // cy.get('label').contains('Object1').should('exist');
        // cy.get('select.form-control').select('Begin Inspectie');
        // cy.get('select.form-control option[value="1"]').parent('select').select('Begin Inspectie');
        cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
        cy.get(".btn.btn-submit").click();
        cy.contains('Good').click();
        // cy.get("//div[@id='child-2']//textarea[contains(@placeholder,'Add a comment')]").type("This is simple test");
        // cy.contains('button[type="button"]', 'save');
        cy.get(".btn.btn-submit").click();

    });

})
