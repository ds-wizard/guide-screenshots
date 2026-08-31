describe('Profile', () => {
    it('Active Sessions', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/active-sessions')
        cy.contains('Revoke all').click()
        cy.clickModalAction()

        cy.env(['apiUrl', 'adminUsername', 'adminPassword']).then((env) => {
            cy.request({
                method: 'POST',
                url: env.apiUrl + '/tokens',
                body: {
                    email: env.adminUsername,
                    password: env.adminPassword
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
                }
            })
        })

        cy.visitApp('/users/edit/current/active-sessions')
        cy.get('.list-group-item').should('be.visible')

        cy.get('.Users__Edit__content').screenshot('application/profile/settings/active-sessions/form', { padding: [0, 0, 0, 330] })
    })
})
