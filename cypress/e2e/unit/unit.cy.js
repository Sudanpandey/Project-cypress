import "cypress-file-upload";

describe("Test suites: Unit", () => {
  it("Verify Unit Creation with Valid Data", () => {
    cy.login();
    const pNameForPvtInv = "Project-Qaasaa-For-objects" + Date.now();
    const cNameForPvtInv = "Located City-For-Objects" + Date.now();
    //Use custom command for create project
    cy.createNewProject(pNameForPvtInv, cNameForPvtInv);
    const fName = "FirstName" + Date.now();
    const sName = "SecondName" + Date.now();
    const userName = "UserName" + Date.now();
    const emailAddress = "user" + Date.now() + "@example.com";
    const contactPersonName = `${fName} ${sName}`;
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.createContactPersonWithNoCompany(
      fName,
      sName,
      userName,
      emailAddress,
      contactPersonName
    );
    const adminUserName = "AdminUserName" + Date.now();
    const adminFirstName = "FirstName" + Date.now();
    const adminSurName = "LastName" + Date.now();
    const adminEmailAddress = "CompnyEmailAdd" + Date.now() + "@example.com";
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.createAdmin(
      adminUserName,
      adminFirstName,
      adminSurName,
      adminEmailAddress
    );
    //Switch to Objectn tab
    // cy.get('.sidebar').trigger('mouseover');
    // cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Objecten')`).click();
    cy.get("a.card-header-tab.tab-object").click();
    //Click New object button
    cy.get(".d-none").should("contain", "Nieuw object").click();
    cy.get(".page-title").should("contain", "Objecten");
    // cy.get('select[required="required"].form-control').eq(0).click().select(pName);
    cy.get("select.form-control").eq(0).select(pNameForPvtInv);
    //Select owner type is
    const streetNameForPvtInv = "Street-" + Date.now();
    const houseNoForPvtInv = "HouseNo-" + Date.now();
    cy.get("select.form-control").eq(1).select("Particuliere belegger");
    cy.get("select.form-control")
      .eq(1)
      .should("contain", "Particuliere belegger");
    cy.get('input[type="search"].vs__search')
      .eq(0)
      .type(contactPersonName)
      .type("{enter}");
    // cy.get('#vs4__combobox').eq(0).select("Madhusudan Pandey");
    cy.get(".vs__selected").eq(0).should("contain", contactPersonName);

    cy.get("select.form-control").eq(2).select("Appartement");
    cy.get("select.form-control").eq(2).should("contain", "Appartement");
    cy.get("select.form-control").eq(3).select("Beschikbaar");
    cy.get("select.form-control").eq(3).should("contain", "Beschikbaar");
    cy.get('input[name="address"].form-control')
      .eq(0)
      .type(streetNameForPvtInv);
    cy.get('input[name="address"].form-control').eq(1).type(houseNoForPvtInv);
    cy.get('input[title="Postcode should look like 1234 AB"].form-control')
      .eq(0)
      .type("3456GH");
    cy.get('input[name="address"].form-control').eq(2).type("City-Patan");
    cy.get("select.form-control").eq(4).select("Groningen");
    cy.get("select.form-control").eq(4).should("contain", "Groningen");
    cy.get('input[inputmode="decimal"].form-control').eq(0).type("5000");
    cy.get('input[inputmode="decimal"].form-control').eq(1).type("200");
    cy.get('input[inputmode="decimal"].form-control').eq(2).type("45");
    cy.get('input[inputmode="decimal"].form-control').eq(3).type("65");
    cy.get('input[inputmode="decimal"].form-control').eq(4).type("34");
    cy.get('input[inputmode="decimal"].form-control').eq(5).type("65");
    //Can Implement with create new administrator and use that email?
    cy.get("select.form-control").eq(5).select(adminEmailAddress);
    cy.get("select.form-control").eq(5).should("contain", adminEmailAddress);

    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The Object was successfully added"
    );
    cy.get(".notification-title").click();
    cy.wait(2000);
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      `${streetNameForPvtInv} ${houseNoForPvtInv}`
    );
    // Create Unit after creation the object
    // cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Objecten')`).click();
    const unitNumber = "UnitNo" + Date.now();
    // const cName = "Located City" + Date.now();
    // cy.get("a.card-header-tab tab-unit").click();
    cy.get("a.card-header-tab.tab-unit").contains("Units").click();
    cy.get('div[class="d-none d-sm-block"]')
      .should("contain", "Nieuwe Unit")
      .click();
    const unitItem = `${streetNameForPvtInv} ${houseNoForPvtInv} City-Patan`;
    cy.get('input[required="required"].form-control').eq(0).type(unitNumber);
    cy.get("select.form-control").eq(0).select(unitItem);
    cy.get("select.form-control").eq(1).select("Beschikbaar");
    cy.get("select.form-control").eq(1).should("contain", "Beschikbaar");
    cy.get('input[inputmode="decimal"].form-control').eq(0).type("5000");
    cy.get('button[type="submit"].btn.btn-secondary')
      .should("contain", "Bevestig")
      .click();
  });
});
