import "cypress-file-upload";
describe("Inspection", () => {
  it("Should display error message for empty Inspection", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    // cy.get('select.form-control option:nth-child(2)').parent('select').select('1');
    cy.get(".btn.btn-submit").click();
    cy.get("#swal2-content").should(
      "have.text",
      "Je moet een template selecteren"
    );
    cy.get(".swal2-confirm").click();
    cy.wait(5000);
  });
  it("Should display error message for empty Inspection name", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    cy.get("select.form-control option:nth-child(2)")
      .parent("select")
      .select("1");
    cy.get("input[required='required']").clear();
    cy.get(".btn.btn-submit").click();
  });
  it("When we create a supplier, the created supplier should be listed at the top of the page", () => {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    cy.get("select.form-control option:nth-child(2)")
      .parent("select")
      .select("1");
    cy.get("input[required='required']")
      .clear()
      .type("This is test inspection name");
    cy.get(".btn.btn-submit").click();
    cy.contains("success").click();
    // cy.get('.h5 > .btn').should('contain','Opslaan');
  });
  it("should display the upload the images", function () {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    cy.get("select.form-control option:nth-child(2)")
      .parent("select")
      .select("1");
    cy.get("input[required='required']").click();
    cy.get(".btn.btn-submit").click();
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
    cy.wait(2000);
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
    cy.wait(2000);
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
    cy.wait(5000);
    //Sign the inspection
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
      });
  });

  it("Hit and trial", function () {
    cy.login();
    // Click objecten
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    cy.get("select.form-control option:nth-child(2)")
      .parent("select")
      .select("1");
    cy.get("input[required='required']").click();
    cy.get(".btn.btn-submit").click();
    cy.get(".h5 > .btn").should("contain", "Opslaan");
    cy.contains("Good").click();
    cy.get(
      "#child-2 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("This is test comment");
    cy.contains("Voeg foto toe").click();
    const fileName = "1.png";
    cy.fixture("1.png")
      .then(Cypress.Blob.base64StringToBlob)
      .then((fileContent) => {
        cy.get("#dropzone_2").attachFile(
          { fileContent, fileName, mimeType: "image/**" },
          { subjectType: "drag-n-drop" }
        );
      });
    cy.contains('button[type="button"]', "Volgende").click();
  });
  it("Create inspection with empty cases", function () {
    cy.login();
    cy.get(`li:contains('Objecten')`).click();
    cy.get(`td[data-title="Locatie"]`).should("be.visible").first().click();
    cy.get(".tab-bar .nav-pills li.nav-item a.nav-link")
      .contains("Inspecties")
      .click();
    cy.contains("Nieuwe Inspectie").click();
    cy.get("select.form-control option:nth-child(2)")
      .parent("select")
      .select("1");
    cy.get("input[required='required']").click();
    cy.get(".btn.btn-submit").click();
    cy.get(".h5 > .btn").should("contain", "Opslaan");
    cy.contains("Good").click();
    cy.get(
      "#child-2 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("This is test comment");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.get(
      "#child-3 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(2) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-3 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("Hey this is second step comment");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.get(
      "#child-1608825595546 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(3) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1608825595546 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("This comment");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.get(
      "#child-1609247279598 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(1) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1609247279598 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type(" this is comment for testing");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.contains('button[type="button"]', "Volgende").click();
    cy.get(
      "#child-1608825795127 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(2) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1608825795127 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("this is testing text");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.get(
      "#child-1608825806388 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(2) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1608825806388 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("Type text comment");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.get(
      "#child-1609247117938 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(3) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1609247117938 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("Test comment.");
    cy.contains('button[type="button"]', "Volgende").click();
    cy.wait(2000);
    cy.get(
      "#child-1609247118308 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-5 > .d-flex > :nth-child(1) > .label-text > .mdi"
    ).click();
    cy.get(
      "#child-1609247118308 > .ctb-inspect-inside-row > :nth-child(1) > .col-md-6 > :nth-child(1) > :nth-child(1) > .form-control"
    ).type("Test test comment.");
    cy.contains('button[type="button"]', "Volgende").click();
  });
});
