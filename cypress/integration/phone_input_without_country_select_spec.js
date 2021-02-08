describe('Phone Input (without country <select>)', ()=>{
    it('should navigate to the gitlab react phone number input page', ()=>{
        cy.visit('https://catamphetamine.gitlab.io/react-phone-number-input/');
    });

    it('should click the link and scroll to the ((without country <select>) section)', ()=>{
        cy.get('#content').within(()=>{
            cy.get('p').eq(0).contains('The phone number input component comes in two variants: "with country select" and "without country select".');
            cy.get('a').eq(1).contains("without country select").click();
            cy.get('#with-country-select').should('be.visible');
        });
    });

    it('Summary section should format text properly for international numbers', ()=>{
        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(0).within(()=>{

                // south korea    - type - "823312345678 - should display in the text field as "+82 33 1234 5678" - value section sohuld read +823312345678
                cy.log("South Korea");
                cy.checkPhoneFormatValues('823312345678', '+82 33 1234 5678', '+823312345678');
                cy.log("South Korea - Correct")

                // south africa   - type - "264611234567"  - should display in the text field as "+264 61 123 4567"  - value section should read +264611234567
                cy.log("South Africa");
                cy.checkPhoneFormatValues('264611234567', '+264 61 123 4567', '+264611234567');
                cy.log("South Africa - Correct");

                // united states  - type - "14151234567"   - should display in the text field as "+1 415 123 4567"   - value section should read +14151234567
                cy.log("United States");
                cy.checkPhoneFormatValues("14151234567", "+1 415 123 4567", "+14151234567")
                cy.log("United States - Correct");

                // china          - type - "8631112345678" - should display in the text field as "+86 311 1234 5678" - value section should read +8631112345679
                cy.log("China")
                cy.checkPhoneFormatValues("8631112345678", "+86 311 1234 5678", "+8631112345678");
                cy.log("China - Correct");

                // united kinggom - type - "4402012345678" - should display in the text field as "+44 020 1234 5678" - value section should read +442012345678
                // note: the 0 in the value section is not displayed in the international phone code values.
                cy.log("United Kingdom");
                cy.checkPhoneFormatValues("4402012345678", "+44 020 1234 5678", "+442012345678");
                cy.log("United Kingdom - Correct");

                                // no country select
                // able to enter phone number that gets formatted to country format 

            });
        });
    });

    it('Country="US" should only allow numbers to be formatted in US formats', ()=>{
        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(1).within(()=>{
                cy.log('Checking that typing a 10 digit number formats to (xxx) xxx-xxxx');
                cy.checkPhoneFormatValues('4151234567', '(415) 123-4567', '+14151234567');
                cy.log("works");
                cy.log('Checking that typing the country code 1 plus a 10 digit number formats to 1 (xxx) xxx-xxxx');
                cy.checkPhoneFormatValues('14151234567', '1 (415) 123-4567', '+14151234567');
                cy.log('works');
            });
        });
    });

    it('country="US" / international should only allow U.S. numbers in international format', ()=>{
        // typing a 10 digit number should convert it to US format

        // typing US number in international format with the 1 should translate to international format (i.e. ignore the user's prenended 1)
        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(2).within(()=>{

                cy.log('typing a 10 digit U.S. number should convert it to US format');
                cy.checkPhoneFormatValues('4151234567', '415 123 4567', '+14151234567');
                cy.log('works');

                cy.log('typing US number in international format with the 1 should translate to international format (i.e. ignore the user\'s prenended 1');
                cy.checkPhoneFormatValues('14151234567', '1 415 123 4567', '+14151234567');
                cy.log('works');

            });
        });
    });

    it('country="US" / international / withCountryCallingCode should always have the +1 in the input field', ()=>{
        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(3).within(()=>{

                // +1 is in the input field by default, but doesn't show in the value until a digit is typed
                cy.get('input[placeholder="Enter phone number"]').should('have.attr', 'value', "+1");
                cy.get('p').eq(3).invoke('text').then($ptxt =>{
                    const txt = $ptxt;
                    expect(txt).not.to.contain('1');
                });

                // +1 can't be cleared from the input field
                cy.get('input[placeholder="Enter phone number"]').clear().should('have.attr', 'value', "+1");

                // not typing 1, but typing a valid US phone number should automatically show 1 in the field. 
                cy.get('input[placeholder="Enter phone number"]').type('4151234567');

                // check the value is +14151234567
                cy.get('p').eq(3).contains('+14151234567').should('be.visible');
            });
        });
    });

    it('defaultCountry="US" should allow national format for US and international for other countries', ()=>{

        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(4).within(()=>{
                // national format US

                cy.log("United States - national");
                cy.checkPhoneFormatValues("4151234567", "(415) 123-4567", "+14151234567");
                cy.log("United States - Correct");

                // international format US

                cy.log("United States - international");
                cy.checkPhoneFormatValues("+14151234567", "+1 415 123 4567", "+14151234567");
                cy.log("United States - Correct");

                // international format south korea

                cy.log("South Korea");
                cy.checkPhoneFormatValues('+823312345678', '+82 33 1234 5678', '+823312345678');
                cy.log("South Korea - Correct")

                // international format south africa

                cy.log("South Africa");
                cy.checkPhoneFormatValues('+264611234567', '+264 61 123 4567', '+264611234567');
                cy.log("South Africa - Correct");

                // international format china 

                cy.log("China")
                cy.checkPhoneFormatValues("+8631112345678", "+86 311 1234 5678", "+8631112345678");
                cy.log("China - Correct");

                // international format UK

                cy.log("United Kingdom");
                cy.checkPhoneFormatValues("+4402012345678", "+44 020 1234 5678", "+442012345678");
                cy.log("United Kingdom - Correct");
            });
        });
    });

    it('No Country - should only allow numbers in international format', ()=>{

        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(5).within(()=>{

                // US national format doesn't work
                // specifically - when typing 415xxxxxxx, the 41 gets interpreted as though it's a number from Switzerland (41 country code)

                cy.log('United States - national - gets converted to Swiss')
                cy.get('input[placeholder="Enter phone number"]').type("4151234567");
                cy.get('input[placeholder="Enter phone number"]').should('have.attr', 'value', "+41 51 234 56 7");
                cy.get('p').eq(1).contains('+4151234567').should('be.visible');
                cy.get('input[placeholder="Enter phone number"]').clear();
                cy.log('United States - national - converted to Swiss - Correct');

                // US international format does work

                cy.log("United States - international");
                cy.checkPhoneFormatValuesNoCountry("+14151234567", "+1 415 123 4567", "+14151234567");
                cy.log("United States - Correct");

                // international format south korea

                cy.log("South Korea");
                cy.checkPhoneFormatValuesNoCountry('+823312345678', '+82 33 1234 5678', '+823312345678');
                cy.log("South Korea - Correct")

                // international format south africa

                cy.log("South Africa");
                cy.checkPhoneFormatValuesNoCountry('+264611234567', '+264 61 123 4567', '+264611234567');
                cy.log("South Africa - Correct");

                // international format china 

                cy.log("China")
                cy.checkPhoneFormatValuesNoCountry("+8631112345678", "+86 311 1234 5678", "+8631112345678");
                cy.log("China - Correct");

                // international format UK

                cy.log("United Kingdom");
                cy.checkPhoneFormatValuesNoCountry("+4402012345678", "+44 020 1234 5678", "+442012345678");
                cy.log("United Kingdom - Correct");



            });
        });
    });

    it('Custom Input should not have any sample input fields, but should have instructions', ()=>{

        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(6).within(()=>{

                cy.log("Checking there are no custom input fields");
                cy.get('input').should('not.exist');
                cy.log("No input fields - correct");

                cy.log("Checking it does have instructions about the component");
                cy.get('p').eq(0).contains('A custom inputComponent can be passed to render it instead of the standard DOM <input/>.It must behave as a standard DOM <input/>: support ref, accept a string value, and call onChange(event) whenever it\'s changed.');
                cy.log("has instructions - check");

            });
        });
    });

    it('Adding country </select> should have a dropdown menu where the user can select a country name to display its country code', ()=>{
        cy.get('#without-country-select').parent('.main-section').within(()=>{
            cy.get('section').eq(7).within(()=>{

                cy.log("Checking there is a dropdown menu");
                cy.get('select').should('be.visible');
                cy.log("Dropdown - check.");

                cy.log("Checking 10 random dropdown menu values are correctly correspond with 'Selected country:' display.");
                cy.fixture('phoneNumbers').as('phoneJSON').then($phoneJSON =>{
                    for (let i = 0; i < 10; i++){
                        let randomCountryNumber = Math.floor(Math.random() * Object.keys($phoneJSON.selectedCountry).length);
                        cy.log('randomCountryNumber: ', randomCountryNumber);
                        let selectedCountryValue = Object.keys($phoneJSON.selectedCountry)[randomCountryNumber];
                        cy.log('selectedCountryValue: ', selectedCountryValue);
                        let selectedCountryCode = $phoneJSON.selectedCountry[selectedCountryValue];
                        cy.log('selectedCountryCode: ', selectedCountryCode);
                        cy.get('select').select(selectedCountryCode).invoke('val').then(($countryCode)=>{
                            let displayName = $phoneJSON.selectedCode[$countryCode];
                            expect(displayName).to.eql(selectedCountryValue);
                        });
                        cy.get('p').contains(selectedCountryCode).should('be.visible');
                    }
                });

                cy.log("Randomly selected dropdown values checked");
            });
        });
    });
});