const appUrl = (url) => Cypress.expose('url') + url
const apiUrl = (baseUrl, url) => baseUrl + url

const createHeaders = (token) => ({ Authorization: 'Bearer ' + token })

const getTokenWith = (email, password, baseUrl) => cy.request({
    method: 'POST',
    url: apiUrl(baseUrl, '/tokens'),
    body: { email, password }
})

const getTokenFor = (role) => {
    const usernameKey = role + 'Username'
    const passwordKey = role + 'Password'

    return cy.env(['apiUrl', usernameKey, passwordKey]).then((env) => getTokenWith(
        env[usernameKey],
        env[passwordKey],
        env.apiUrl
    ).then((resp) => {
        resp.apiUrl = env.apiUrl
        return resp
    }))
}

const login = (resp) => {
    const token = resp.body.token
    createSession(token, resp.apiUrl)
}

const createSession = (token, baseUrl, expiresAt = null) => {
    expiresAt = expiresAt || new Date(Date.now() + 14000 * 86400)
    window.localStorage.setItem('session/wizard', JSON.stringify({
        apiUrl: apiUrl(baseUrl, ''),
        fullscreen: false,
        sidebarCollapsed: false,
        rightPanelCollapsed: true,
        token: { token, expiresAt },
        v9: true
    }))
}

const dataCy = (key) => {
    return `[data-cy="${key}"]`
}


// Authentication commands

Cypress.Commands.add('getTokenFor', getTokenFor)

Cypress.Commands.add('loginAs', (role) => {
    getTokenFor(role).then(login)
})


// Navigation commands

Cypress.Commands.add('visitApp', (url) => {
    cy.visit({
        url: appUrl(url),
        method: 'GET',
        headers: {
            'Accept-Language': 'en',
        },
        onBeforeLoad: (win) => {
            Object.defineProperty(win.navigator, 'language', { value: 'en' })
        },
    })
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
            cy.get(`#${key} .typehints-search`).type(value)
            cy.get(`#${key} ul li a .typehints-complex-item`).contains(value).click()
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
            cy.get(`#${key}`).blur()
        }
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

Cypress.Commands.add('submitForm', () => {
    cy.getCy('form_submit').click()
})


// Listing commands

Cypress.Commands.add('clickListingItemAction', (identifier, action) => {
    cy.getListingItem(identifier).find(dataCy(`listing-item_action_${action}`)).click({ force: true })
})

Cypress.Commands.add('getListingItem', (identifier) => {
    cy.getCy('listing_item').contains(identifier).closest(dataCy('listing_item'))
})

Cypress.Commands.add('openLastItemDropdown', () => {
    cy.get('.list-group-item').should('exist')

    cy.get('.dropdown-toggle').last().click()
    cy.get('.dropdown-item').should('be.visible')
})

// Modals

Cypress.Commands.add('clickModalAction', () => {
    cy.getCy('modal_action-button').filter(':visible').click()
})
