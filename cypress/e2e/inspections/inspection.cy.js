describe("Login", () => {
    it("Should display error message for empty Inspection", () => {
        cy.login();
        // Click objecten
        cy.get(`li:contains('Objecten')`).click();
        cy.get(`td[data-title="Locatie"]`).should('be.visible').first().click();
        cy.get('.tab-bar .nav-pills li.nav-item a.nav-link').contains('Inspecties').click();
        cy.contains('Nieuwe Inspectie').click();
        // cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
        cy.get(".btn.btn-submit").click();
        cy.get('#swal2-content').should('have.text','Je moet een template selecteren');
        cy.get('.swal2-confirm').click();
        cy.wait(5000);
      })
      it("Should display error message for empty Inspection name", () => {
        cy.login();
        // Click objecten 
        cy.get(`li:contains('Objecten')`).click();
        cy.get(`td[data-title="Locatie"]`).should('be.visible').first().click();
        cy.get('.tab-bar .nav-pills li.nav-item a.nav-link').contains('Inspecties').click();
        cy.contains('Nieuwe Inspectie').click();
        cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
        cy.get("input[required='required']").clear();
        cy.get(".btn.btn-submit").click();
      })
      it("When we create a supplier, the created supplier should be listed at the top of the page", () => {
        cy.login();
        // Click objecten 
        cy.get(`li:contains('Objecten')`).click();
        cy.get(`td[data-title="Locatie"]`).should('be.visible').first().click();
        cy.get('.tab-bar .nav-pills li.nav-item a.nav-link').contains('Inspecties').click();
        cy.contains('Nieuwe Inspectie').click();
        cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
        cy.get("input[required='required']").clear().type('This is test inspection name');
        cy.get(".btn.btn-submit").click();
        cy.contains('success').click();
        // cy.get('.h5 > .btn').should('contain','Opslaan');
      })
      it.only("Test Test", () => {
        cy.login();
        // Click objecten 
        cy.get(`li:contains('Objecten')`).click();
        cy.get(`td[data-title="Locatie"]`).should('be.visible').first().click();
        cy.get('.tab-bar .nav-pills li.nav-item a.nav-link').contains('Inspecties').click();
        cy.contains('Nieuwe Inspectie').click();
        cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
        cy.get("input[required='required']").click();
        cy.get(".btn.btn-submit").click();
        cy.get('.h5 > .btn').should('contain','Opslaan');
        cy.contains('Good').click();
        // cy.get("textarea[@placeholder='Add a comment']").type("This is test comment");
        cy.get('#child-2 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control').type("This is test comment");
      })
    it.skip("Login Success with Valid Login Details", function () {
        cy.login();
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
