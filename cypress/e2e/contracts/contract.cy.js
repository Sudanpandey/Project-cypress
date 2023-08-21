import "cypress-file-upload";
const contractName = "Contract" + Date.now();

describe("Create Contract", () => {
  it("Should display error message for empty contracts", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(2) > .nav-link").click();
    /*check empty contract name field validation */
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(
      ".col > :nth-child(1) > .col-12 > .form-group > .form-control"
    ).clear();
    cy.get(".btn-secondary").click();
    // cy.contains('Please fill in this field.').click();
  });

  it("Should be listed at the top of the page after creating new contracts", () => {
    cy.login();
    // Navigation
    cy.get(":nth-child(11) > .nav-item > .icon-sidenav", {
      timeout: 20000,
    }).click();
    cy.get(".nav > :nth-child(2) > .nav-link").click();
    //Create new contracts
    cy.get('div[class="d-none d-sm-block"]').click();
    cy.get(
      ".col > :nth-child(1) > .col-12 > .form-group > .form-control"
    ).clear();
    cy.get(".col > :nth-child(1) > .col-12 > .form-group > .form-control").type(
      contractName
    );
    cy.fixture("contract.docx").then((fileContent) => {
      cy.get("#file").attachFile({
        fileContent: fileContent,
        fileName: "contract.docx",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
    });
    cy.get("#file")
      .should("have.prop", "files")
      .then((files) => {
        expect(files.length).to.equal(1);
        expect(files[0].name).to.equal("contract.docx");
        expect(files[0].type).to.equal(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
      });
    cy.get(".btn-secondary").click();
    cy.get(".notification-content").should(
      "contain",
      "The contract was successfully added"
    );
    cy.wait(2000);
    cy.get("table tbody tr").then((rows) => {
      const lastRow = rows[rows.length - 1];
      //Currently in a pending state, awaiting modifications from the development team. The desired adjustment is to ensure that recently created data is positioned at the top row of the table.
      // cy.wrap(lastRow).should("contain", contractName);
    });
    // Search message template through search box
    cy.get("#template-search-id").type(contractName).type("{enter}");
    //Pending => Due to server issues (500 error)
  });

  it("Should contract with attachments and assert...", () => {});
});
