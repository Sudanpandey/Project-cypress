import "cypress-file-upload";

describe("Project", () => {
  it("Verify Project Creation with Valid Data", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    const pName = "Project-Qaasaa" + Date.now();
    const cName = "Located City" + Date.now();

    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
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
    cy.get("tbody>tr:nth-child(1)").should("contain", pName);
  });
  it("Verify Project Creation with Valid Data and owner type is Private Invester", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    const pNameWithPrivateInv = "Project-Qaasaa-Pvt-Inv" + Date.now();
    const cNameWithPrivateInv = "Located City" + Date.now();

    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .type(pNameWithPrivateInv);
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(1)
      .type(cNameWithPrivateInv);
    cy.get("#ownerType").select("Particuliere belegger");
    cy.get("#ownerType").should("contain", "Particuliere belegger");
    cy.get('input[placeholder="Select owner"]').click();
    cy.get('input[placeholder="Select owner"]').type("Geen").type("{enter}");
    cy.get(".vs__selected-options").should("contain", "Geen");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The project was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameWithPrivateInv);
    //Search recently created project
    cy.get("#object-search-id")
      .clear()
      .type(pNameWithPrivateInv)
      .type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameWithPrivateInv);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.get(".notification-content").should(
      "contain",
      "Project succesvol verwijderd"
    );
    cy.wait(3000);
    cy.get("#object-search-id").clear();
  });

  it.skip("Verify Project Creation with Empty Fields", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    // cy.get("div.form-group.form-group-focus input.form-control")
    //   .eq(0)
    //   .type("");
    // cy.get("div.form-group.form-group-focus input.form-control")
    //   .eq(1)
    //   .type("");
    cy.get("#ownerType").select("Geen");
    cy.get("#ownerType").should("contain", "Geen");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    //Assertion for empty validation
  })

  it("Verify Dropdown Options of Select the owner type", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    const dropdownOptions = ["Geen", "Particuliere belegger", "Organisatie"];
    cy.get("#ownerType").select("Geen");
    cy.get("#ownerType").should("contain", "Geen");
    cy.get("#ownerType").select("Particuliere belegger");
    cy.get("#ownerType").should("contain", "Particuliere belegger");
    cy.get("#ownerType").select("Organisatie");
    cy.get("#ownerType").should("contain", "Organisatie");
    cy.get('button[type="button"].btn.btn-primary').click();
  });
  it("Verify Project Already Exists also Search and Delete Created Project", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .type("$%!@~````");
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(1)
      .type("~_&^$&");
    cy.get("#ownerType").select("Geen");
    cy.get("#ownerType").should("contain", "Geen");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The project was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", "$%!@~````");
    //Verify project is already exist
    cy.wait(5000);
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .type("$%!@~````");
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(1)
      .type("~_&^$&");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".swal2-title").should("contain", "Project bestaat al");
    cy.get(".swal2-close").click();
    cy.get('button[type="button"].btn.btn-primary').click();
    //Search recently created project
    cy.get("#object-search-id").clear().type("$%!@~````").type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", "$%!@~````");
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.get(".notification-content").should(
      "contain",
      "Project succesvol verwijderd"
    );
    cy.wait(3000);
    cy.get("#object-search-id").clear();
  });

  it("Verify Project Creation with Invalid Data", () => {
    cy.login();
    // Click objecten
    //Pending Due to there is no invalid scenarios occurs.
  });
  it("Verify Project Update:When edit button is clicked, the data should be populated in the form", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    const pNameForEdit = "Project-Qaasaa" + Date.now();
    const cNameForEdit = "Located City" + Date.now();
    const pNameForEditNext = "Edited-Project-Qaasaa" + Date.now();
    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .type(pNameForEdit);
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(1)
      .type(cNameForEdit);
    cy.get("#ownerType").select("Geen");
    cy.get("#ownerType").should("contain", "Geen");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The project was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameForEdit);
    //Search recently created item
    cy.get("#object-search-id").clear().type(pNameForEdit).type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameForEdit);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    ////Click edit button for recently created item
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Bewerk").click();
    //verify recently created data is populated on input field or not
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .clear()
      .type(pNameForEditNext);
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The project was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameForEditNext);
    //Search recently created project
    cy.get("#object-search-id").clear().type(pNameForEditNext).type("{enter}");
    cy.get("tbody>tr:nth-child(1)").should("contain", pNameForEditNext);
    cy.get("tbody").find("tr").its("length").should("be.eq", 1);
    //Delete recently created contract-type
    cy.get(".mdi.mdi-cog").click();
    cy.contains("Verwijderen").click();
    cy.get("button.swal2-confirm[type='button']").click();
    cy.get(".notification-content").should(
      "contain",
      "Project succesvol verwijderd"
    );
    cy.wait(3000);
    cy.get("#object-search-id").clear();
  });

  it.skip("Verify Project Image Uploading", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    const projNameForImage = "Project-Qaasaa-with-image" + Date.now();
    const cityNameForImage = "Located City-for-image" + Date.now();
    cy.get("a.card-header-tab.tab-project").click();
    //Click New project button
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuw project")
      .click();
    cy.fixture("8.jpg").then((fileContent) => {
      // Use cy.get to locate the file input element and attach the image
      cy.get('input[type="file"].o-0').attachFile({
        fileContent: fileContent,
        fileName: "8.jpg",
        mimeType: "image/jpeg", // Correct MIME type for a JPG image
      });
    });
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(0)
      .type(projNameForImage);
    cy.get("div.form-group.form-group-focus input.form-control")
      .eq(1)
      .type(cityNameForImage);
    cy.get("#ownerType").select("Geen");
    cy.get("#ownerType").should("contain", "Geen");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The project was successfully added"
    );
    cy.get("tbody>tr:nth-child(1)").should("contain", projNameForImage); /////
  });
});
