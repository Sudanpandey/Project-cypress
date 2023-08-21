import "cypress-file-upload";
const contractTypeName = "Contract-type" + Date.now();
const editContractTypeName = "e-contract-type" + Date.now();
const emptyEditContractTypeName = "empty-e-contract-type" + Date.now();

describe("Create Contract-type", () => {
  it("Should display error message for empty contracts-type", () => {
    cy.login();
    // Navigation
    // cy.get('.nav-sidebar ul li').last({timeout: 20000}).click();
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(3) > .nav-link").click();
    /*check empty contract-type name field validation */
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    //Click save button
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".text-danger.order-5").should(
      "contain",
      "Het name veld is verplicht."
    );
    cy.get('button[class="btn btn-icon btn-light"]').click();
  });
  it("Should close the opened model after click the cancel button ", () => {
    cy.login();
    // Navigation
    // cy.get('.nav-sidebar ul li').last({timeout: 20000}).click();
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(3) > .nav-link").click();
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    //click cancel button
    cy.get('button[class="btn btn-light"]').click();
    cy.get('h1[class="page-title"]').should("contain", "Contract type");
  });
  it("Should create the new contract-type after entering name and click save button ", () => {
    cy.login();
    // Navigation
    // cy.get('.nav-sidebar ul li').last({timeout: 20000}).click();
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(3) > .nav-link").click();
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    //create new contract-type
    cy.get("input[name='name']").type(contractTypeName);
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".notification-content").should(
      "contain",
      "Contracttype is succesvol opgeslagen."
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", contractTypeName);
    //Search recently created item
    cy.get("input[placeholder='Search']")
      .clear()
      .type(contractTypeName)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", contractTypeName);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.contains("Contracttype is succesvol opgeslagen.")
      .should("be.visible")
      .click();
    cy.wait(5000);
  });
  it("Should open a edit modal when edit button is click", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    // cy.get('.nav-sidebar ul li').last({timeout: 20000}).click();
    cy.get(".nav > :nth-child(3) > .nav-link").click();
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    //create new contract type
    cy.get("input[name='name']").type(editContractTypeName);
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".notification-content").should(
      "contain",
      "Contracttype is succesvol opgeslagen."
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", editContractTypeName);
    //Search recently created item
    cy.get("input[placeholder='Search']")
      .clear()
      .type(editContractTypeName)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", editContractTypeName);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    ////Click edit button for recently created item
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Bewerk").click();
    //verify recently created data is populated on input field or not
    cy.get("input[name='name']").should("have.value", editContractTypeName);
    cy.get("input[name='name']")
      .clear()
      .type("Edited" + editContractTypeName);
    cy.get('button[class="btn btn-primary"]').click();
    cy.contains("Contracttype is succesvol opgeslagen.")
      .should("be.visible")
      .click();
    cy.contains("success").click();
    //Search recently created item
    cy.get("input[placeholder='Search']")
      .clear()
      .type("Edited" + editContractTypeName)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      "Edited" + editContractTypeName
    );
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.contains("success").click();
    cy.get("input[placeholder='Search']").clear();
    cy.wait(5000);
  });
  it("should be empty validation in the edit action", () => {
    cy.login();
    // Navigation
    // cy.get('.nav-sidebar ul li').last({timeout: 20000}).click();
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(3) > .nav-link").click();
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    //create new contract type
    cy.get("input[name='name']").type(emptyEditContractTypeName);
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".notification-content").should(
      "contain",
      "Contracttype is succesvol opgeslagen."
    );
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      emptyEditContractTypeName
    );
    //The contract type name should be unique
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.contains("Nieuw contracttype maken");
    // cy.get("input[name='name']").should('have.value',emptyEditContractTypeName);
    cy.get("input[name='name']").type(emptyEditContractTypeName);
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".text-danger.order-5").should("contain", "name is al bezet.");
    cy.get('button[class="btn btn-icon btn-light"]').click();
    //Search recently created item
    cy.get("input[placeholder='Search']")
      .clear()
      .type(emptyEditContractTypeName)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      emptyEditContractTypeName
    );
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    ////Click edit button for recently created item
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Bewerk").click();
    //verify recently created data is populated on input field or not
    cy.get("input[name='name']").should(
      "have.value",
      emptyEditContractTypeName
    );
    cy.get("input[name='name']").clear();
    cy.get('button[class="btn btn-primary"]').click();
    cy.get(".text-danger.order-5").should(
      "contain",
      "Het name veld is verplicht."
    );
    cy.get('button[class="btn btn-icon btn-light"]').click();
    //Search recently created item
    cy.get("input[placeholder='Search']")
      .clear()
      .type(emptyEditContractTypeName)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", editContractTypeName);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.contains("success").click();
    cy.get("input[placeholder='Search']").clear();
    cy.wait(5000);
  });
});
