describe('Profile', () => {
    it('Active Sessions', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/active-sessions')
        cy.contains('Revoke all').click()
        cy.clickModalAction()

        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + '/tokens',
            body: { 
                email: Cypress.env('adminUsername'),
                password: Cypress.env('adminPassword')
             },
             headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
             }
        })

        cy.visitApp('/users/edit/current/active-sessions')
        cy.get('.col-wide-detail').screenshot('application/profile/edit/active-sessions/form', { padding: [50, 240, 10, 330] })
    })
})
