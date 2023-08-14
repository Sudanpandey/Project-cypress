import "cypress-file-upload";
// import faker from "faker";

describe("Objects feature", () => {
  it("Verify Project Creation with Valid Data and create object( with No owner type) using that project.", () => {
    cy.login();
    const pName = "Project-Qaasaa-For-objects" + Date.now();
    const cName = "Located City-For-Objects" + Date.now();
    //Use custom command for create project
    cy.createNewProject(pName, cName);
    //Switch to Objectn tab
    // cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get("a.card-header-tab.tab-object").click();
    //Click New object button
    cy.get(".d-none").should("contain", "Nieuw object").click();
    cy.get(".page-title").should("contain", "Objecten");
    // cy.get('select[required="required"].form-control').eq(0).click().select(pName);
    cy.get("select.form-control").eq(0).select(pName);
    //No any select owner type
    const streetName = "Street-" + Date.now();
    const houseNo = "HouseNo-" + Date.now();
    cy.get("select.form-control").eq(1).select("Geen");
    cy.get("select.form-control").eq(1).should("contain", "Geen");
    cy.get("select.form-control").eq(2).select("Appartement");
    cy.get("select.form-control").eq(2).should("contain", "Appartement");
    cy.get("select.form-control").eq(3).select("Beschikbaar");
    cy.get("select.form-control").eq(3).should("contain", "Beschikbaar");
    cy.get('input[name="address"].form-control').eq(0).type(streetName);
    cy.get('input[name="address"].form-control').eq(1).type(houseNo);
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
    cy.get("select.form-control").eq(5).select("sahaj.malla+101@proshore.eu");
    cy.get("select.form-control")
      .eq(5)
      .should("contain", "sahaj.malla+101@proshore.eu");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The Object was successfully added"
    );
    cy.get(".notification-title").click();
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      `${streetName} ${houseNo}`
    );
  });
  it.only("Verify Project Creation with Valid Data and create object(with owner type is Private Invester) using that project", () => {
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
    cy.createAdmin(
      adminUserName,
      adminFirstName,
      adminSurName,
      adminEmailAddress
    );
    //Switch to Objectn tab
    cy.get(".sidebar-lock-switch > .mdi").click();
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
  });
  it("Verify Project Creation with Valid Data and create object (with owner type is Organization) using that project", () => {
    cy.login();
    const pNameForOrg = "Project-Qaasaa-For-objects" + Date.now();
    const cNameForOrg = "Located City-For-Objects" + Date.now();
    //Use custom command for create project
    cy.wait(5000);
    cy.createNewProject(pNameForOrg, cNameForOrg);
    const fName = "FirstName" + Date.now();
    const sName = "SecondName" + Date.now();
    const userName = "UserName" + Date.now();
    const emailAddress = "user" + Date.now() + "@example.com";
    const name = "CompanyName" + Date.now();
    const address = "CompanyAddress" + Date.now();
    const zipCode = "4565gh";
    const cityName = "CompanyCityName" + Date.now();
    const companyEmailAddress = "CompnyEmailAdd" + Date.now() + "@example.com";
    const companyName = `${fName} ${sName}`;
    cy.createContactPersonWithCompany(
      fName,
      sName,
      userName,
      emailAddress,
      name,
      address,
      zipCode,
      cityName,
      companyEmailAddress,
      companyName
    );
    //Switch to Objectn tab
    cy.get(".sidebar-lock-switch > .mdi").click();
    cy.get(`li:contains('Objecten')`).click();
    cy.get("a.card-header-tab.tab-object").click();
    //Click New object button
    cy.get(".d-none").should("contain", "Nieuw object").click();
    cy.get(".page-title").should("contain", "Objecten");
    // cy.get('select[required="required"].form-control').eq(0).click().select(pName);
    cy.get("select.form-control").eq(0).select(pNameForOrg);
    //Select owner type is
    const streetNameForOrg = "Street-" + Date.now();
    const houseNoForOrg = "HouseNo-" + Date.now();
    cy.get("select.form-control").eq(1).select("Organisatie");
    cy.get("select.form-control").eq(1).should("contain", "Organisatie");
    cy.get('input[type="search"].vs__search').eq(0).type(name).type("{enter}");
    cy.get(".vs__selected").eq(0).should("contain", name);
    cy.get("select.form-control").eq(2).select("Appartement");
    cy.get("select.form-control").eq(2).should("contain", "Appartement");
    cy.get("select.form-control").eq(3).select("Beschikbaar");
    cy.get("select.form-control").eq(3).should("contain", "Beschikbaar");
    cy.get('input[name="address"].form-control').eq(0).type(streetNameForOrg);
    cy.get('input[name="address"].form-control').eq(1).type(houseNoForOrg);
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
    cy.get("select.form-control").eq(5).select("sahaj.malla+101@proshore.eu");
    cy.get("select.form-control")
      .eq(5)
      .should("contain", "sahaj.malla+101@proshore.eu");
    cy.get('button[type="submit"].btn.btn-secondary').click();
    cy.get(".notification-content").should(
      "contain",
      "The Object was successfully added"
    );
    cy.get(".notification-title").click();
    cy.get("tbody>tr:nth-child(1)").should(
      "contain",
      `${streetNameForOrg} ${houseNoForOrg}`
    );
  });
  it("Create new admin", () => {
    cy.login();
    //Crearte admin
    // const userName = "CompanyName" + Date.now();
    // const firstName = "CompanyAddress" + Date.now();
    // const surName = "4565gh";
    // const emailAddress = "CompnyEmailAdd" + Date.now() + "@example.com";
    // cy.createAdmin(userName, firstName, surName, emailAddress);
  });
});
