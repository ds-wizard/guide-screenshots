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

// Authentication commands

Cypress.Commands.add('loginAs', (role) => {
    getTokenFor(role).then(login)
})


// Navigation commands

Cypress.Commands.add('visitApp', (url) => {
    cy.visit(`${Cypress.env('url')}${url}`)
    cy.get('.full-page-loader').should('not.exist')
})

Cypress.Commands.add('collapseSidebar', () => {
    cy.get('.collapse-link').click()
})

