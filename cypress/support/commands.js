const apiUrl = (url) => Cypress.env('apiUrl') + url

const createHeaders = (token) => ({ Authorization: 'Bearer ' + token })

const getTokenWith = (email, password) => cy.request({
    method: 'POST',
    url: apiUrl('/tokens'),
    body: { email, password }
})

const getTokenFor = (role) => getTokenWith(
    Cypress.env(role + 'Username'),
    Cypress.env(role + 'Password')
)

const login = (resp) => {
    const token = resp.body.token

    cy.request({
        method: 'GET',
        url: apiUrl('/users/current'),
        headers: createHeaders(token)
    }).then((resp) => {
        window.localStorage.setItem('session', JSON.stringify({
            sidebarCollapsed: false,
            token: { token },
            user: resp.body,
            fullscreen: false,
            v6: true
        }))
        window.localStorage.setItem('cookieConsent', 1)
    })
}

const dataCy = (key) => {
    return `[data-cy="${key}"]`
}


// Authentication commands

Cypress.Commands.add('loginAs', (role) => {
    getTokenFor(role).then(login)
})


// Navigation commands

Cypress.Commands.add('visitApp', (url) => {
    cy.visit(`${Cypress.env('url')}${url}`, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', { value: 'en' });
        },
      });
    cy.get('.full-page-loader').should('not.exist')
})

Cypress.Commands.add('collapseSidebar', () => {
    cy.get('.collapse-link').click()
})


// Selection commands

Cypress.Commands.add('getCy', (key, extra = '') => {
    return cy.get(`${dataCy(key)}${extra}`)
})


// Form commands

Cypress.Commands.add('fillFields', (fields) => {
    Object.entries(fields).forEach(([key, value]) => {
        if (key.startsWith('s_')) {
            key = key.replace(/^s_/, '')
            cy.get(`#${key}`).select(value)
        } else if (key.startsWith('th_')) {
            key = key.replace(/^th_/, '')
            cy.get(`#${key}`).click()
            cy.get(`#${key} .TypeHintInput__TypeHints__Search`).type(value)
            cy.get(`#${key} .TypeHintInput__TypeHints ul li a`).contains(value).click()
        } else if (key.startsWith('c_')) {
            key = key.replace(/^c_/, '')
            if (value) {
                cy.get(`#${key}`).check()
            } else {
                cy.get(`#${key}`).uncheck()
            }
        } else {
            if (value.length > 0) {
                cy.get(`#${key}`).clear().type(value)
            } else {
                cy.get(`#${key}`).clear()
            }
        }
        cy.get(`#${key}`).blur()
    })
})

Cypress.Commands.add('checkToggle', (field) => {
    cy.wait(100)
    cy.get(`#${field}`).check({ force: true })
})

Cypress.Commands.add('uncheckToggle', (field) => {
    cy.wait(100)
    cy.get(`#${field}`).uncheck({ force: true })
})


// Listing commands

Cypress.Commands.add('getListingItem', (identifier) => {
    cy.getCy('listing_item').contains(identifier).closest(dataCy('listing_item'))
})

Cypress.Commands.add('clickListingItemAction', (identifier, action) => {
    cy.getListingItem(identifier).find(dataCy(`listing-item_action_${action}`)).click({ force: true })
})

// Modals

Cypress.Commands.add('clickModalAction', () => {
    cy.getCy('modal_action-button').filter(':visible').click()
})
