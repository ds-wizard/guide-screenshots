describe('Users', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/users')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)

        cy.screenshot('application/administration/users/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.col-wide-detail').should('exist')

        cy.get('.col-wide-detail').screenshot('application/administration/users/detail/profile', { padding: [50, 10, 10, 330] })
    })

    it('Password', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.col-wide-detail').should('exist')
        cy.get('.nav-link').contains('Password').click()
        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.col-detail').screenshot('application/administration/users/detail/password', { padding: [50, 240, 10, 330] })
    })
})
