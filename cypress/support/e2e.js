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
    const apiUrl = Cypress.env('apiUrl')
    let token
    cy
        .getTokenFor('admin')
        .then((resp) => {
            token = resp.body.token
        })
        .then(() => cy.request({
            method: 'GET',
            url: `${apiUrl}/tenants/current/config`,
            headers: { Authorization: `Bearer ${token}` }
        }))
        .then((resp) => {
            const config = resp.body
            config.lookAndFeel.appTitle = Cypress.env('appTitle')
            config.lookAndFeel.appTitleShort = Cypress.env('appTitleShort')
            config.lookAndFeel.primaryColor = Cypress.env('primaryColor')
            config.lookAndFeel.illustrationsColor = Cypress.env('illustrationsColor')
            config.lookAndFeel.logoUrl = Cypress.env('logoUrl')

            cy.request({
                method: 'PUT',
                url: `${apiUrl}/tenants/current/config`,
                headers: { Authorization: `Bearer ${token}` },
                body: config
            })
        })
})
