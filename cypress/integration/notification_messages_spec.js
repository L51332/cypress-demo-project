describe('Notification Messages', ()=>{
    // show page content
    // make comamnds
    it('should display the original page loaded content', ()=>{
        
        cy.visit('http://the-internet.herokuapp.com/notification_message_rendered');

        // no flash notification message
        cy.get('#flash').should('not.exist');

        // notification message header
        cy.get('div.example').within(()=>{
            cy.get('h3').should('have.text', 'Notification Message');

            // notification message link
            //cy.get('a').should('have.attr', 'href', '/notification_message').should('have.text', "Click here");
            cy.get('a').should('have.attr', 'href', '/notification_message').contains("Click here");
        });
    });

    it('clicking the "Click here" link should load a message', ()=>{
        cy.fixture('notificationMessage').as('notifJSON').then($notifJSON => {
            cy.get('a').contains("Click here").click().then(()=>{
                cy.get('#flash').then(($msg)=>{
                    let text = $msg.text();
                    expect(text === $notifJSON.successful || text === $notifJSON.successful);

                });
            });
        });
    });

    it('clicking the "Click here" link several times should load messages again', ()=>{
        let timesToClick = Math.ceil(Math.random() * 5);

        // TODO: make it keep clicking until you've gotten both messages / change the questino message to make sure it does this
        cy.fixture('notificationMessage').as('notifJSON').then($notifJSON => {          
            for (let clicks = 0; clicks < timesToClick; clicks++){
                cy.get('a').contains("Click here").click();
                cy.wait(250);// wait 1/4 second for content to load
                cy.get('#flash').then(($msg)=>{
                    let text = $msg.text();
                    expect(text === $notifJSON.successful || text === $notifJSON.successful);
                });
            }
        });

    });
});