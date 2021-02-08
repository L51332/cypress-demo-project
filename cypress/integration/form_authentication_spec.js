describe('Form Authentication page', ()=>{

    beforeEach(()=>{
        cy.visit('http://the-internet.herokuapp.com/login');
    });

    it('page content should be displayed',()=>{
        cy.fixture('formAuthentication').as('authJSON').then((authJSON)=>{
            const subheaderText = authJSON.subheaderText;

            cy.get('h2').should('have.text', "Login Page");
            cy.get('.subheader').should('have.text', subheaderText);

            cy.get('label[for="username"]').should('have.text', "Username");
            cy.get('#username').should('be.enabled');

            cy.get('label[for="password"]');
            cy.get('#password').should('be.enabled');

            cy.get('button').should('have.text', " Login").should('be.enabled');
        });
    });

    it('entering an INVALID USERNAME prevents user from logging in',()=>{
        cy.fixture('formAuthentication').as('authJSON').then((authJSON)=>{
            cy.get('#username').type("AN INVALID USERNAME");
            cy.get('#password').type(authJSON.password);// correct password
            cy.get('button').click().then(()=>{
                cy.wait(100);// wait 1/10 of a second for flash to load
                cy.get('#flash').contains(authJSON.invalidUsernameText);
            });
        });
    });

    it('entering an INVALID PASSWORD prevents user from logging in',()=>{
        cy.fixture('formAuthentication').as('authJSON').then((authJSON)=>{
            cy.get('#username').type(authJSON.username);
            cy.get('#password').type("WRONG PASSWORD");// correct password
            cy.get('button').click().then(()=>{
                cy.wait(100);// wait 1/10 of a second for flash to load
                cy.get('#flash').contains(authJSON.invalidPasswordText);
            });
        });
    });

    it('entering CORRECT username and password should allow the user to log in and display the correct content',()=>{
        cy.fixture('formAuthentication').as('authJSON').then((authJSON)=>{
            cy.get('#username').type(authJSON.username);
            cy.get('#password').type(authJSON.password);// correct password
            cy.get('button').click().then(()=>{
                cy.wait(100);// wait 1/10 of a second for flash to load
                cy.get('#flash').contains(authJSON.successfulLoginText);
                cy.get('h2').should('have.text',' Secure Area');
                cy.get('a.button').should('have.text', " Logout");
            });
        });
    });

    it('once logged in, the user should be able to log out', ()=>{
        cy.fixture('formAuthentication').as('authJSON').then((authJSON)=>{
            cy.login(authJSON.username, authJSON.password);
            cy.get('#flash').contains(authJSON.successfulLoginText);
            cy.logout();
            cy.get('#flash').contains(authJSON.secureAreaLogoutText);
            cy.get('h2').should('have.text', "Login Page");
            cy.get('#username').should('be.visible').should('be.enabled');
            cy.get('#password').should('be.visible').should('be.enabled');
        });
    });
});