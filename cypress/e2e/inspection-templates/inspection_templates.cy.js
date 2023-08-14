import "cypress-file-upload";
const editInspectionTitle = "Inspection Template" + Date.now();

describe("Inspection Templates", () => {
  it("Should display error message for empty template name", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    /*check empty template name  name field validation */
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".form-group > .form-control").clear();
    cy.get(".card-footer > .btn-secondary").click();
    // cy.contains('Please fill in this field.').click();
  });
  it.only("Should be listed at the top of the page after creating new contracts", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    //Create new inspection template
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".form-group > label").should("contain", "Sjabloonnaam");
    cy.get(".card-footer > .btn-secondary").click();
    cy.get(".notification-content").should(
      "contain",
      "The template was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", "Inspection title");
    // cy.get('tbody').find('tr').its('length').should('be.eq', 1);
  });
  it("Should edit the template name and add a leaf node to the default category", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    //Create new inspection template
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".form-group > label").should("contain", "Sjabloonnaam");
    cy.get(".form-group > .form-control").clear();
    cy.get(".form-group > .form-control").type(editInspectionTitle);
    cy.contains("Sample category").click();
    cy.get('[title="Add Leaf Node"] > .icon > .mdi').click();
    cy.get(".vtl-node-content").should("contain", " New item ");
  });
  it("Should add a new category and new entry under that category", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    //Create new inspection template
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".form-group > label").should("contain", "Sjabloonnaam");
    cy.contains("categorie toevoegen").click();
    cy.get(".vtl-node-content").contains("New category");
    cy.get(".vtl-operation").invoke("removeAttr", "style");
    cy.get('.vtl-operation span[title="Add Leaf Node"]').eq(1).click();
    cy.contains(".vtl-node-content", "New item");

    // cy.contains('button', 'categorie toevoegen').click();
    // cy.get('.vtl-operation span[title="Add Leaf Node"]:first').click();
    // cy.get('span[title="Add Leaf Node"]').click();
    // cy.contains('New category').click();
    // cy.get('form-group form-group-focus > .btn-secondary').click();
    // cy.get('[title="edit"] > .icon > .mdi mdi-pencil').click();
  });
  it("Should edit the category and associated entry", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    //Edit default inspection template
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".form-group > label").should("contain", "Sjabloonnaam");
    cy.contains(".vtl-node-content", "Sample category");
    // cy.get('.vtl-operation').invoke('removeAttr', 'style');
    cy.get(".vtl-operation").first().invoke("removeAttr", "style");
    cy.get('span[title="edit"]').eq(0).click();
    cy.get(".vtl-input").clear().type("Wall inspection");
    // cy.get('.form-group > label').should('contain','Sjabloonnaam').click();vtl
    cy.get(".mdi.mdi-menu.mr-2").click();
    //Edit catagory items
    cy.contains(".vtl-node-content", " Inspection item 1 ");
    cy.get(".vtl-operation").eq(1).invoke("removeAttr", "style");
    cy.get('.vtl-operation span[title="edit"]').eq(1).click();
    cy.get(".vtl-input").clear().type("Floor Item -one Ins");
    cy.get(".mdi.mdi-menu.mr-2").click();
    cy.get(".vtl-operation").eq(2).invoke("removeAttr", "style");
    cy.get('.vtl-operation span[title="edit"]').eq(2).click();
    cy.get(".vtl-input").clear().type("Floor Item -Two Ins");
    cy.get(".mdi.mdi-menu.mr-2").click();
  });
  it("Should redirect to the inspection template page when clicking the back button", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    /*check redirect to the inspection template page */
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get("button.btn-primary").contains("Terug").click();
    cy.get("div.d-flex.align-items-center").contains(
      "Note: De inspectiesjabloon die momenteel in gebruik is en niet kan worden verwijderd."
    );
  });
  it("When N-numbers of add category is clicked, N+1 nos main category should be apppears  ", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    /*check redirect to the inspection template page */
    cy.get('div[class="d-none d-sm-block"]').click();
    // cy.get('div.d-flex.align-items-center').contains('Note: De inspectiesjabloon die momenteel in gebruik is en niet kan worden verwijderd.');
    cy.get(".vtl-node-content")
      .eq(0)
      .then(($categories) => {
        const initialNumberOfCategories = $categories.length;
        // Define the number of new categories to add (you can adjust this value as needed)
        const numberOfNewCategoriesToAdd = 10;
        // Click the "categorie toevoegen" button multiple times to add new categories
        for (let i = 0; i < numberOfNewCategoriesToAdd; i++) {
          cy.contains("categorie toevoegen").click();
        }
        // Get the final count of categories
        cy.get(".vtl-tree-node").then(($categoriesAfter) => {
          const finalNumberOfCategories = $categoriesAfter.length;
          // Calculate the expected total number of categories after adding new ones
          const expectedTotalCategories =
            initialNumberOfCategories + numberOfNewCategoriesToAdd;
          // Assert that the number of categories increased as expected (n+1)
          cy.wrap(finalNumberOfCategories).should(
            "eq",
            expectedTotalCategories
          );
          cy.get(".card-footer > .btn-secondary").click();
          cy.get(".notification-content").should(
            "contain",
            "De categorie van de inspectietemplate mag geen lege onderliggende items hebben."
          );
          cy.get(".notification-title").click();
        });
      });
  });
  it("When N-numbers of add Sub-category is clicked, N+2 numbers of Sub-category should be apppears", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(4) > .nav-link").click();
    cy.get("div.d-flex.align-items-center").contains(
      "Note: De inspectiesjabloon die momenteel in gebruik is en niet kan worden verwijderd."
    );
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(".vtl-node-content")
      .eq(0)
      .then(($categories) => {
        const initialNumberOfCategories = $categories.length;
        const numberOfNewCategoriesToAdd = 1;
        for (let i = 0; i < numberOfNewCategoriesToAdd; i++) {
          cy.contains("categorie toevoegen").click();
          cy.get(".vtl-node-content").contains("New category");
          cy.get(".vtl-operation").invoke("removeAttr", "style");
          cy.get('.vtl-operation span[title="Add Leaf Node"]').eq(1).click();
          cy.contains(".vtl-node-content", "New item");
        }
        cy.get(".vtl-node-content").then(($categoriesAfter) => {
          const finalNumberOfCategories = $categoriesAfter.length;
          // Calculate the expected total number of categories after adding new ones
          const expectedTotalCategories =
            initialNumberOfCategories + numberOfNewCategoriesToAdd;
          // Assert that the number of categories and sub-category increased as expected (n+3)
          cy.wrap(finalNumberOfCategories).should(
            "eq",
            expectedTotalCategories + 3
          );
          cy.get(".card-footer > .btn-secondary").click();
          cy.get(".notification-content").should(
            "contain",
            "The template was successfully added"
          );
          cy.get(".notification-title").click();
        });
      });

    // cy.get('button.btn-primary').contains('Terug').click();
    // cy.get('div.d-flex.align-items-center').contains('Note: De inspectiesjabloon die momenteel in gebruik is en niet kan worden verwijderd.');
  });
});
