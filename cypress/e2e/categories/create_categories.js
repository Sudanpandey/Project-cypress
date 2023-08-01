const categoryName = "category" + Date.now();
const editCategoryName = "edit_category" + Date.now();
describe("Create category", () => {
  before(() => {
    // cy.clearAllCookies();
    cy.login();
  });
  beforeEach(() => {
    cy.visit("/app/home#/");
  });

  it("Should display error message for empty category name- Create category", () => {
    // cy.login();
    // Navigation
    cy.get(":nth-child(10) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get("li:nth-of-type(8) div:nth-of-type(2)").click();
    cy.get("div.d-none").click();
    cy.get("input[name='name']").click();

    /*check empty field validation*/
    cy.get("div.side-panel-footer button.btn-primary").click();
    cy.get(".text-danger.order-5").should(
      "contain",
      "Het name veld is verplicht."
    );
    cy.contains("Error").click();
    cy.get(`button[class="btn btn-icon btn-light"]`).click();
  });

  it("Should display success message for valid category name- create category", () => {
    // cy.login();
    // Navigation
    cy.get(":nth-child(10) > .nav-item > .icon-sidenav").click();
    cy.get("li:nth-of-type(8) div:nth-of-type(2)").click();
    cy.get("div.d-none").click();
    cy.get("input[name='name']").click();

    // Create category and listed at the top of the table.
    cy.get("input[name='name']").type(categoryName);
    cy.get("div.side-panel-footer button.btn-primary").click();
    cy.get("tbody>tr:nth-child(1)").should("contain", categoryName);
    cy.get("tbody>tr:nth-child(1)").should("contain", 0);
    cy.contains("success").should("be.visible").click();

    // Search Category
    cy.get(".form-control-search").type(categoryName).type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", categoryName);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);

    //Verify existing category
    cy.get("div.d-none").click();
    cy.get("input[name='name']").type(categoryName);
    cy.get("div.side-panel-footer button.btn-primary").click();
    cy.get(".text-danger.order-5").should("contain", "name is al bezet.");
    cy.contains("Error").click();
    cy.get(".mdi.mdi-close").click();

    // Delete Create Category
    cy.get("tbody>tr:nth-child(1)").should("contain", categoryName);
    cy.get(".mdi.mdi-cog").click();
    cy.get(".text-right > .dropdown > .dropdown-menu > :nth-child(3)").click();
    cy.get("button.swal2-confirm").click();
    cy.contains("success").should("be.visible").click();
  });
  /**
 Edit Feature
**/

  it("Should display error message for empty category name- Edit categories", () => {
    //Navigation
    cy.get(":nth-child(10) > .nav-item > .icon-sidenav").click();
    cy.get("li:nth-of-type(8) div:nth-of-type(2)").click();
    cy.get("div.d-none").click();
    cy.get("input[name='name']").click();

    /* Create category for Edit */
    cy.get("input[name='name']").type(editCategoryName);
    cy.get("div.side-panel-footer button.btn-primary").click();
    cy.contains("success").should("be.visible").click();

    //There should be empty validation in the update action
    cy.get("tbody>tr:nth-child(1)").should("contain", editCategoryName);
    cy.get(":nth-child(1) > .text-right > .dropdown > .btn > .mdi").click();
    cy.get(
      "div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(2)"
    ).click();
    cy.get("input[name='name']").clear();
    cy.get("div.side-panel-footer button.btn-primary", {
      timeout: 2000,
    }).click();
    cy.get(".text-danger.order-5").should(
      "contain",
      "Het name veld is verplicht."
    );
    cy.contains("Error").click();
    cy.get(".mdi.mdi-close").click();
  });

  it("Should display success message for edit with valid category name- Edit categories", () => {
    // cy.login();
    //Navigation
    cy.wait(5000);
    cy.get(":nth-child(10) > .nav-item > .icon-sidenav").click();
    cy.get("li:nth-of-type(8) div:nth-of-type(2)").click();
    cy.get("div.d-none").click();
    cy.get("input[name='name']", { timeout: 8000 }).click();

    /* Create category for Edit */
    cy.get("input[name='name']").type("some" + editCategoryName);
    cy.get("div.side-panel-footer button.btn-primary", {
      timeout: 2000,
    }).click();
    cy.contains("success").click();
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      "some" + editCategoryName
    );

    /*When a edit button is clicked, it should open a modal */
    cy.get(":nth-child(1) > .text-right > .dropdown > .btn > .mdi").click();
    cy.get(
      "div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(2)"
    ).click();
    cy.contains("Leverancierscategorie bewerken").should("be.visible");
    //When a edit button is clicked, the name should be populated in the input box
    cy.get("input[name='name']").should(
      "have.value",
      "some" + editCategoryName
    );
    cy.get("input[name='name']").type("-updated cat");
    cy.get("div.side-panel-footer button.btn-primary").click();
    cy.contains("success").should("be.visible").click();
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      "some" + editCategoryName + "-updated cat"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", 0);
  });

  it("Edit categories-unique validation but it should ignore the existings data to be updated", () => {
    //Navigation
    cy.wait(5000);
    cy.get(":nth-child(10) > .nav-item > .icon-sidenav").click();
    cy.get("li:nth-of-type(8) div:nth-of-type(2)").click();
    cy.get("div.d-none", { timeout: 8000 }).click();
    cy.get("input[name='name']").click();

    /* Create first category for Edit */
    cy.get("input[name='name']").type(categoryName);
    cy.get("div.side-panel-footer button.btn-primary", {
      timeout: 8000,
    }).click();
    cy.contains("success").should("be.visible").click();
    cy.get("tbody>tr:nth-child(1)").should("contain", categoryName);

    /* Create second category for Edit */
    cy.get("div.d-none").click();
    cy.get("input[name='name']").click();
    cy.get("input[name='name']").type("new" + editCategoryName);
    cy.get("div.side-panel-footer button.btn-primary", {
      timeout: 8000,
    }).click();
    cy.contains("success").click();
    cy.get("tbody>tr:nth-child(1)", { timeout: 8000 }).should(
      "contain",
      "new" + editCategoryName
    );

    //Update with existing category Name
    cy.get(":nth-child(1) > .text-right > .dropdown > .btn > .mdi").click();
    cy.get(
      "div[class='dropdown-menu dropdown-menu-right show'] button:nth-child(2)"
    ).click();
    cy.wait(2000);

    //Pending--- assert with edit name with table row
    cy.get("input[name='name']").clear();
    cy.get("input[name='name']").type(categoryName);
    cy.get("div.side-panel-footer button.btn-primary", {
      timeout: 8000,
    }).click();
    cy.contains("Error").click();
    cy.contains("name is al bezet.");
    cy.get(".text-danger.order-5").should("contain", "name is al bezet.");
    cy.get(".mdi.mdi-close").click();
  });
});
