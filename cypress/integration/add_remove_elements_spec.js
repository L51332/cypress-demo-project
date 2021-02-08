describe('Add/Remove Elements page ', () => {

    let buttonsToAddAndDelete = Math.ceil(Math.random()*10);
    
    it('should be able to load page content', ()=> {
        cy.visit('http://the-internet.herokuapp.com/add_remove_elements/');
    });

    it('should show a header saying "Add/Remove Elements', ()=>{
        cy.get('h3').should('have.text', 'Add/Remove Elements');
    });

    it('should have a button that says "Add Element"', ()=> {
        cy.get('button').should('have.text', 'Add Element');
    });

    it('clicking the "Add element" button should add a button labelled "Delete"', ()=>{
        cy.get('button').should('have.text', 'Add Element').then((ele)=>{
            cy.wrap(ele).click();
        });
    });

    it('clicking the  "Delete" button should make it disappear', () =>{
        cy.get('#elements').within((elementsDiv) => {
            cy.get('.added-manually').then((ele)=>{
                expect(ele).to.have.length(1);
                cy.wrap(ele).click();
                cy.get('.added-manually').should('not.exist');
            });
        });
    });

    it('should be possible to add multiple of elements', ()=>{
        for (let clicksToAdd = 0; clicksToAdd < buttonsToAddAndDelete; clicksToAdd++){
            cy.get('.example').within(()=>{
                cy.get('button').eq(0).click();
            });
        }
    });

    it('clicking each of those elements should delete them', ()=>{
        let buttonsLeft = buttonsToAddAndDelete;
        for (let clicksToDelete = 0; clicksToDelete < buttonsToAddAndDelete; clicksToDelete++){
            cy.get('#elements').within(()=>{
                let indexOfButtonToDelete = Math.floor(Math.random()*buttonsLeft);
                cy.get('button').eq(indexOfButtonToDelete).click();
            });
            buttonsLeft--;
        }
        cy.get('#elements').within(()=>{
            cy.get('button').should('not.exist');
        })
    });
});