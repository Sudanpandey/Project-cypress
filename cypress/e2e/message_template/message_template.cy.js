import 'cypress-file-upload';

const templateName = 'template' + Date.now();
const uniqueTemplateName = 'unique_template' + Date.now();
const editTemplateName = 'edit_template' + Date.now();
const templateNameWithAttch = 'template_name_Attch' + Date.now();
const templateNameEmptyVal = 'template_name_empty' + Date.now();
const uniqueEditTemplate= 'unique_template_name' + Date.now();
const createTemplate= 'template_name' + Date.now();

describe("Create category", () => {
    before(() => {
    // cy.clearAllCookies();
    cy.login();
  
    })
    beforeEach(()=>{
    cy.visit('/app/home#/');
    cy.url().should('include','/app/home#/')
    })
    // after(()=>{
    // cy.logout();
    // })

    it("Should display error message for empty message template", () => {
        // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        /*check empty Template name field validation */
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").clear();
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('Error').click();
        cy.get('.text-danger.order-5').should('contain', 'Het Sjabloonnaam veld is verplicht.');
        /*check empty Template name and subject field validation */
        cy.get("button.btn-primary[type='button']").click();
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").clear();
        cy.get("input[name='subject']").clear();
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('Error').click();
        cy.get('.text-danger.order-5').should('contain', 'Het Sjabloonnaam veld is verplicht.').and('contain','Het subject veld is verplicht.')
        /*check empty Template name,subject field and Template validation */
        cy.get("button.btn-primary[type='button']").click();
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").clear();
        cy.get("input[name='subject']").clear();
        cy.get('.ql-editor').clear();
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('Error').click();
        cy.get('.text-danger.order-5').should('contain', 'Het Sjabloonnaam veld is verplicht.')
        .and('contain','Het subject veld is verplicht.')
        .and('contain','Het template veld is verplicht.');
        cy.wait(10000);
      })

    it("Should be listed at the top of the page after creating new message template", () => {
         // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(templateName);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('success').should('be.visible').click();
        // Create message template and listed at the top of the table.
        cy.get('tbody>tr:nth-child(1)').should('contain',templateName);
        cy.get('tbody>tr:nth-child(1)').should('contain', 0);
        //Delete recently created message template
        cy.get("input[placeholder='Search']").clear().type(templateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',templateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
      })

    it("Should be listed at the the page after recently created message template search ", () => {
        // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type('new' + templateName);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('success').should('be.visible').click();
        // Search message template through search box.
        cy.get("input[placeholder='Search']",{timeout: 10000}).clear().type('new' + templateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain','new' + templateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        //Delete recently created message template
        cy.get("input[placeholder='Search']").clear().type('new' + templateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain','new' + templateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
     })
    it("Should be display unique message when messsage template it created", () => {
       // Navigation
       cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
       cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
       /*
       cy.get("li:nth-of-type(9) div:nth-of-type(2)").should('be.visible').then(($element) => {
            // Element is visible, perform the click action
            cy.wrap($element).click();
       }).catch(() => {
            // Selector is not visible or element not found
            cy.log('API failure: Selector is not visible');
            // Handle the API failure or perform additional error logging
       });
       */
       //Create message template
       //cy.get('div[class="d-none d-sm-block"]',{timeout:20000}).should('be.visible');
       cy.get('div[class="d-none d-sm-block"]').click();
       cy.get("input[name='name']").type(uniqueTemplateName);
       cy.get("input[name='subject']").type("Test subject.");
       cy.get('.ql-editor').type("Test Template Body.");
       cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
       cy.contains('success').click();
       cy.get('tbody>tr:nth-child(1)').should('contain',uniqueTemplateName);
       cy.wait(2000);
       // Check uniqueness of mesage template.
       cy.get('div[class="d-none d-sm-block"]').click();
       cy.get("input[name='name']").type(uniqueTemplateName);
       cy.get("button.btn-secondary[type='submit']").click();
       cy.contains('Error').should('be.visible').click();
       cy.get('.text-danger.order-5', {timeout:80000}).should('contain', 'Sjabloonnaam is al bezet.');
       cy.get("button.btn-primary[type='button']").click();
       //Delete recently created message template
       cy.get("input[placeholder='Search']").clear().type(`${uniqueTemplateName}{enter}`);
       cy.get('tbody>tr:nth-child(1)').should('contain',uniqueTemplateName);
       cy.get('tbody').find('tr').its('length').should('be.eq', 1);
       cy.get('.mdi.mdi-cog').click();
       cy.contains('Verwijderen').click();
       cy.get("button.swal2-confirm[type='button']").click();
       cy.contains('success').should('be.visible').click();
       cy.wait(10000);
     })
    it("Should open a edit modal when edit button is click", () => {
        cy.wait(5000);
         // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(editTemplateName);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.contains('success').click();
        cy.get('tbody>tr:nth-child(1)').should('contain',editTemplateName);
        cy.wait(2000);  
        //Search recently created item
        cy.get("input[placeholder='Search']").clear().type(editTemplateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',editTemplateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        //Click edit button for recently created item
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Bewerk').click();
        //verify recently created data is populated on input field or not
        cy.get("input[name='name']").should('have.value',editTemplateName);
        cy.get("button.btn-primary[type='button']").click();
         //Delete recently created message template
        cy.get("input[placeholder='Search']").clear().type(editTemplateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',editTemplateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
        // cy.get('tbody').find('tr').its('length').should('not.be.eq', 1);
    })
    it("Updates message template and reflects changes in the table", () => {
         // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(editTemplateName);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.contains('success').click();
        cy.get('tbody>tr:nth-child(1)').should('contain',editTemplateName);
        cy.wait(2000);  
        //Search recently created item
        cy.get("input[placeholder='Search']").clear().type(editTemplateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',editTemplateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        //Click edit button for recently created item
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Bewerk').click();
        //verify recently created data is populated on input field or not
        cy.get("input[name='name']").should('have.value',editTemplateName);
        cy.get("input[name='name']").clear().type('Edited'+ editTemplateName);
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('success').click();
        cy.get("div[class='col'] h4").should('contain','Edited'+ editTemplateName);
        cy.get("button.btn-primary[type='button']").click();
        //recently edited data should be reflected in the table
        cy.get('tbody>tr:nth-child(1)').should('contain','Edited'+ editTemplateName);
         //Delete recently created message template
        cy.wait(2000);
        cy.get("input[placeholder='Search']").clear().type('Edited'+ editTemplateName).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain','Edited'+ editTemplateName);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
        // cy.get('tbody').find('tr').its('length').should('not.be.eq', 1);
    })
    it("Should be unique validation but it should ignore the existings data to be updated", () => {
        // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template for existing test
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(createTemplate);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.contains('success').click();
        cy.get('tbody>tr:nth-child(1)').should('contain',createTemplate);
        cy.wait(2000);  
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(uniqueEditTemplate);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.contains('success').click();
        cy.get('tbody>tr:nth-child(1)').should('contain',uniqueEditTemplate);
        cy.wait(2000);  
        //Search recently created item
        cy.get("input[placeholder='Search']").clear().type(uniqueEditTemplate).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',uniqueEditTemplate);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1); 
        //Click edit button for recently created item
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Bewerk').click();
        //Check unique validation when we enter existing message template
        cy.get("input[name='name']").should('have.value',uniqueEditTemplate);
        cy.get("input[name='name']").clear();
        cy.get("input[name='name']").type(createTemplate);
        cy.get("input[name='subject']").type('Test Data for subject');
        cy.get('.ql-editor').type('Test Data');
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('Error').click();
        cy.get('.text-danger.order-5').should('contain', 'Sjabloonnaam is al bezet.');
        cy.get("button.btn-primary[type='button']").click();
        cy.get('tbody>tr:nth-child(1)').should('contain',uniqueEditTemplate);
        //Delete recently created message template
        cy.wait(2000);
        cy.get("input[placeholder='Search']").clear().type(uniqueEditTemplate).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',uniqueEditTemplate);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.get("input[placeholder='Search']").clear();
        cy.wait(2000);  
        cy.get("input[placeholder='Search']").clear().type(createTemplate).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',createTemplate);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.get("input[placeholder='Search']").clear();
        cy.wait(10000);
    })
    it("Should be empty validation when all field are cleared and click the update action", () => {
         // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(templateNameEmptyVal);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.contains('success').click();
        cy.get('tbody>tr:nth-child(1)').should('contain',templateNameEmptyVal);
        cy.wait(2000);  
        //Search recently created item
        cy.get("input[placeholder='Search']").clear().type(templateNameEmptyVal).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain',templateNameEmptyVal);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        //Click edit button for recently created item
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Bewerk').click();
        //verify recently created data is populated on input field or not
        cy.get("input[name='name']").should('have.value',templateNameEmptyVal);
        cy.get("input[name='name']").clear();
        cy.get("input[name='subject']").clear();
        cy.get('.ql-editor').clear();
        cy.get("button.btn-secondary[type='submit']").click();
        cy.contains('Error').click();
        cy.get('.text-danger.order-5').should('contain', 'Het Sjabloonnaam veld is verplicht.')
        .and('contain','Het subject veld is verplicht.')
        .and('contain','Het template veld is verplicht.');
        cy.get("button.btn-primary[type='button']").click();
        cy.get('tbody>tr:nth-child(1)').should('contain',templateNameEmptyVal);
         //Delete recently created message template
        cy.wait(2000);
        cy.get("input[placeholder='Search']").clear().type(templateNameEmptyVal).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain', templateNameEmptyVal);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
    })
    it("Should message template with attachments and assert the count in the table after creation", () => {
       // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(templateNameWithAttch);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        //File uploading 
        cy.get("input[name='files[]']").attachFile(["1.pdf","2.pdf"]);
        cy.get("div[class='order-2']").should('contain',"1.pdf","2.pdf");
        cy.get("button.btn-secondary[type='submit']",{timeout:8000}).click();
        cy.get('tbody>tr:nth-child(1)').should('contain',templateNameWithAttch);
        cy.get('tbody>tr:nth-child(1)').should('contain', 2);
        //Delete recently created message template
        cy.wait(2000);
        cy.get("input[placeholder='Search']").clear().type(templateNameWithAttch).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain', templateNameWithAttch);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
   })
    it("Refactor-: Should upload dynamic images", () => {
        // Navigation
        cy.get(':nth-child(10) > .nav-item > .icon-sidenav',{timeout: 20000}).click();
        cy.get("li:nth-of-type(9) div:nth-of-type(2)").click();
        //Create message template
        cy.get('div[class="d-none d-sm-block"]').click();
        cy.get("input[name='name']").type(templateNameWithAttch);
        cy.get("input[name='subject']").type("Test subject.");
        cy.get('.ql-editor').type("Test Template Body.");
        //File uploading 
        const Images = ['1.pdf', '2.pdf', '3.pdf', '4.pdf', '5.pdf', '6.pdf', '7.pdf'];

        // Generate random indices
        const randomIndices = Array.from({ length: 3 }, () => Math.floor(Math.random() * Images.length));

        // Select and store the random images
        const selectedImages = randomIndices.map((index) => Images[index]);

        // Click the "Choose Files" button and upload the selected images
        cy.get("input[name='files[]']").then((input) => {
        selectedImages.forEach((imageName) => {
            cy.fixture(imageName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((blob) => {
                const testFile = new File([blob], imageName, { type: 'application/pdf' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(testFile);
                const fileInput = input[0];
                fileInput.files = dataTransfer.files;
                cy.wrap(input).trigger('change', { force: true });
            });
            });
        });
        // Assert the selected images
        selectedImages.forEach((imageName) => {
        cy.get('.order-2').should('contain', imageName);
        });

        cy.get("button.btn-secondary[type='submit']", { timeout: 8000 }).click();
        cy.get('tbody>tr:nth-child(1)').should('contain', templateNameWithAttch);
        cy.get('tbody>tr:nth-child(1)').should('contain', 6);

        //Delete recently created message template
        cy.wait(2000);
        cy.get("input[placeholder='Search']").clear().type(templateNameWithAttch).type('{enter}');
        cy.get('tbody>tr:nth-child(1)').should('contain', templateNameWithAttch);
        cy.get('tbody').find('tr').its('length').should('be.eq', 1);
        cy.get('.mdi.mdi-cog').click();
        cy.contains('Verwijderen').click();
        cy.get("button.swal2-confirm[type='button']").click();
        cy.contains('success').should('be.visible').click();
        cy.wait(10000);
})
})