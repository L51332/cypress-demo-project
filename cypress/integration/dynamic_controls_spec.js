describe('Dynamic Controls page', ()=>{

    it('should be able to load the page content', ()=>{
        cy.visit('http://the-internet.herokuapp.com/dynamic_controls');
    });

    it('should have the "Remove/Add" (checkbox) and "Enable/Disable" (text) sections', ()=>{
        cy.visit('http://the-internet.herokuapp.com/dynamic_controls');

        // checkbox example
        cy.get('.subheader').eq(0).should('have.text', "Remove/add");
        cy.get('#checkbox-example').within(()=>{
            cy.get("input[type='checkbox']").should('be.enabled').should('not.be.checked');

            cy.get('button').should('have.text', 'Remove');
        });

        // enable / disable
        cy.get('.subheader').eq(1).should('have.text', "Enable/disable");
        cy.get('#input-example').within(()=>{
            cy.get("input[type='text']").should('be.disabled');
            cy.get('button').should('have.text', 'Enable');
        });
    });

    it('should allow the checkbox to be checked and unchecked', ()=>{
        cy.get("input[type='checkbox']").should('not.be.checked');
        cy.get("input[type='checkbox']").click();
        cy.get("input[type='checkbox']").should('be.checked');
        cy.get("input[type='checkbox']").click();
        cy.get("input[type='checkbox']").should('not.be.checked');
    })


    it('clicking the "Remove" button in the checkbox section should remove it', ()=>{
        cy.get('#checkbox-example').within(()=>{
            cy.get('button').should('have.text', 'Remove').then(($remove)=>{
                cy.wrap($remove).click();
                cy.get('#loading[style="display: none;"]').should('not.be.visible');// 4 seconds for loading bar to disappear, otherwise consider defect
                cy.get('#message').should('have.text','It\'s gone!').then(()=>{
                    cy.get("input[type='checkbox']").should('not.exist');
                    cy.get('#loading').should('not.be.visible');
                });
            });
        });
    });

    it('clicking the "Add" button in the checkbox after it\'s removed section should add it back', ()=>{
        cy.get('#checkbox-example').within(()=>{
            cy.get('button').should('have.text', 'Add').then(($add)=>{
                cy.wrap($add).click();
                cy.get('#loading[style="display: none;"]').should('not.be.visible');// 4 seconds for loading bar to disappear, otherwise consider defect
                cy.get('#message').should('have.text','It\'s back!').then(()=>{
                    cy.get("input[type='checkbox']").should('exist').should('be.enabled').should('not.be.checked');
                    cy.get('#loading').should('not.be.visible');
                });
            });
        });
    });

    it('clicking the "Enable" button in the text section should enable the text field' , ()=>{
        cy.visit('http://the-internet.herokuapp.com/dynamic_controls');

        cy.get('#input-example').within(()=>{
            cy.log("Checking text field is disabled.")
            cy.get("input[type='text']").should('be.disabled');
            cy.log("Check");
            cy.get('button').should('have.text', 'Enable').then($enable => {
                cy.log("Clicking Enable button");
                cy.wrap($enable).click();
                cy.log("Clicked");
                cy.get('#loading[style="display: none;"]').should('not.be.visible');// 4 seconds for loading bar to disappear, otherwise consider defect
                cy.log("Checking message says 'It's enabled!");
                cy.get('#message').should('have.text','It\'s enabled!');
                cy.log("It says enabled");
                cy.log("checking text input enabled")
                cy.get("input[type='text']").should('exist').should('be.enabled');
                cy.log("it is");
                });
            });

        cy.get('#input-example');


    });

    it('the user should be able to type into the text field', ()=>{
        cy.get("input[type='text']").type('some sample text').clear();
    });

    it('clicking the "Disable" button after it\'s enabled should disable it again', () => {
        cy.get('#input-example').within(()=>{
            cy.get("input[type='text']").should('be.enabled');
            cy.get('button').should('have.text', 'Disable').then($disable => {
                cy.wrap($disable).click();
                cy.get('#loading[style="display: none;"]').should('not.be.visible');// 4 seconds for loading bar to disappear, otherwise consider defect
                cy.get('#message').should('have.text','It\'s disabled!').then(()=>{
                    cy.get("input[type='text']").should('be.disabled');
                    cy.get('#loading').should('not.be.visible');
                });
            });
        });
    });
});