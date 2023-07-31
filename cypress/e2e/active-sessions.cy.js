describe('Profile', () => {
    it('Active Sessions', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/active-sessions')

        cy.get('.col-wide-detail').screenshot('application/profile/edit/active-sessions/form', { padding: [50, 240, 10, 330] })
    })
})
