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
    // Unit flow--
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
    cy.wait(60000);
    //Inspection flow--
    cy.get("tbody>tr:nth-child(1)").should("contain", unitNumber);
    cy.get("td.align-middle").eq(1).click();
    cy.get(".nav > :nth-child(4) > .nav-link").contains("Inspecties").click();
    cy.get(".btn-outline-primary").contains("Nieuwe Inspectie").click();
    // cy.wait(20000);
    cy.get(".vs__selected")
      .eq(0)
      .should("contain", `${streetNameForPvtInv} ${houseNoForPvtInv}`);
    cy.get(".vs__selected").eq(1).should("contain", unitNumber);
    // cy.get('select[required="required"].form-control').eq(0).type("Begin Inspectie");
    cy.get("select.form-control").select("Begin Inspectie");
    // cy.get('input[type="text"].form-control').clear().type("Test inspection - Unit");
    cy.get('button[type="button"].btn-submit').contains("Volgende").click();
    //Inspection page
    cy.get(".h5 > .btn").should("contain", "Opslaan");
    cy.contains("Good").click();
    cy.get(
      "#child-2 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("This is test comment");
    cy.contains("Voeg foto toe").click();
    const fileNamesStep1 = ["1.png", "2.png", "3.png", "4.png", "5.png"];
    const selector = "#dropzone_2";
    cy.uploadImageInspections(fileNamesStep1, selector);
    cy.log(fileNamesStep1);
    cy.wrap(fileNamesStep1).each((fileName) => {
      expect(fileNamesStep1).to.include(fileName);
    });
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(5000);
    // cy.contains('Voeg foto toe').click();
    cy.get(
      "#child-3 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(2) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-3 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("Hey this is second step comment");
    cy.get(
      "#child-3 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > .m-t-15 > :nth-child(1) > :nth-child(2) > .btn > span"
    ).click();
    const fileNamesStep2 = ["1.png", "2.png"];
    const selector2 = "#dropzone_3";
    cy.uploadImageInspections(fileNamesStep2, selector2);
    cy.log(fileNamesStep2);
    cy.wrap(fileNamesStep2).each((fileName) => {
      expect(fileNamesStep2).to.include(fileName);
    });
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(5000);
    cy.get(
      "#child-1608825595546 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(3) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1608825595546 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("This comment");
    cy.get(
      "#child-1608825595546 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > .m-t-15 > :nth-child(1) > :nth-child(2) > .btn > span"
    ).click();
    const fileNamesStep3 = ["1.png", "2.png", "3.png"];
    const selector3 = "#dropzone_1608825595546";
    cy.uploadImageInspections(fileNamesStep3, selector3);
    cy.log(fileNamesStep3);
    cy.wrap(fileNamesStep3).each((fileName) => {
      expect(fileNamesStep3).to.include(fileName);
    });
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.get(
      "#child-1609247279598 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("No image upload");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.get(".h5 > .btn").click();
    cy.wait(2000);
    cy.get(":nth-child(1) > .p-x-15").click();
    cy.get('[data-target="#collapse_image_2"] > .label-text > .mdi').click();
    cy.wrap(fileNamesStep1).each((fileName) => {
      expect(fileNamesStep1).to.include(fileName);
    });
    cy.wait(2000);
    cy.get('[data-target="#collapse_image_3"] > .label-text > .mdi').click();
    cy.wrap(fileNamesStep2).each((fileName) => {
      expect(fileNamesStep2).to.include(fileName);
    });
    cy.wait(2000);
    cy.get(
      '[data-target="#collapse_image_1608825595546"] > .label-text > .mdi'
    ).click();
    cy.wrap(fileNamesStep3).each((fileName) => {
      expect(fileNamesStep3).to.include(fileName);
    });
    cy.contains('button[type="button"]', "Ga naar ondertekenen").click();
    // cy.wait(5000);
    //Signature part on inspection
    cy.get("canvas")
      .first()
      .then(($canvas) => {
        const canvas = $canvas[0];
        const ctx = canvas.getContext("2d");
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        canvas.addEventListener("mousedown", (event) => {
          isDrawing = true;
          lastX = event.offsetX;
          lastY = event.offsetY;
        });
        canvas.addEventListener("mousemove", (event) => {
          if (!isDrawing) {
            return;
          }
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(event.offsetX, event.offsetY);
          ctx.stroke();
          lastX = event.offsetX;
          lastY = event.offsetY;
        });
        canvas.addEventListener("mouseup", (event) => {
          isDrawing = false;
        });
        cy.drawInCanvas("canvas", 0, 200, 75, 50, 300, 100, 150);
        cy.drawInCanvas("canvas", 1, 200, 75, 50, 300, 100, 150);
        cy.wait(5000);
        cy.contains('button[type="button"]', "Handtekening opslaan").click();
        cy.wait(2000);
        cy.get(".notification-content").should(
          "contain",
          "The inspection report was successfully signed"
        );
        cy.get(".notification-title").click();
      });
  });
});
