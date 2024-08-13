describe('Users', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/users')
        cy.get('.list-group-item').should('exist')

        cy.get('.dropdown-toggle').last().click()
        cy.get('.dropdown-item').should('be.visible')

        cy.screenshot('application/administration/users/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.Users__Edit__content').should('be.visible')

        cy.get('.Users__Edit__content').screenshot('application/administration/users/detail/profile', { padding: [0, 0, 0, 330] })
    })

    it('Password', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.Users__Edit__content').should('exist')
        cy.get('.nav-link').contains('Password').click()
        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.Users__Edit__content').screenshot('application/administration/users/detail/password', { padding: [0, -280, -10, 330] })
    })
})
