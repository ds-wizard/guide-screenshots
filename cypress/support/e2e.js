// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
    cy.loginAs('admin')
    cy.visitApp('/settings/look-and-feel')

    // Set logo
    cy.get('.btn').contains('Change').click()
    const logoFixture = Cypress.env('logoFixture')

    // If there is logo fixture set use it, otherwise set default logo
    if (logoFixture) {
        cy.get('.logo-upload .dropzone')
            .selectFile(`cypress/fixtures/logo/${logoFixture}`, {
                action: 'drag-drop'
            })
    } else {
        cy.contains('Use default logo').click()
    }
    cy.get('.modal-footer .btn-primary').contains('Save').click()

    // generating new styles really take time, so wait a bit
    cy.wait(4000)
    cy.get('.modal-cover').should('not.be.visible')

    // Fill fields with app details and colors
    cy.fillFields({
        appTitle: Cypress.env('appTitle'),
        appTitleShort: Cypress.env('appTitleShort'),
        stylePrimaryColor: Cypress.env('primaryColor'),
        styleIllustrationsColor: Cypress.env('illustrationsColor')
    })
    cy.get('.form-actions-dynamic')
        .then(($formActions) => {
            // check if something has changed in the form before saving
            if ($formActions.attr('class').indexOf('form-actions-dynamic-visible') > -1) {
                cy.submitForm()
                // generating new styles really take time, so wait a bit
                cy.wait(4000)
                cy.get('.form-actions-dynamic-visible').should('not.exist')
            }
        })
})
