describe('Users', () => {
    beforeEach(() => {
        cy.loginAs('admin')
    })

    it('List', () => {
        cy.visitApp('/users')
        
        cy.openLastItemDropdown()

        cy.screenshot('application/administration/users/index/list')
    })

    it('Detail', () => {
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.Users__Edit__content').should('be.visible')

        cy.wait(2000)

        cy.get('.Users__Edit__content').screenshot('application/administration/users/detail/profile', { padding: [0, 0, 0, 330] })
    })

    it('Create', () => {
        cy.visitApp('/users/create')
        cy.getCy('form_submit').should('be.visible')

        cy.get('.container').screenshot('application/administration/users/create/create', { padding: [0, 0, 10, 0] })
    })

    it('Password', () => {
        cy.visitApp('/users/edit/ec6f8e90-2a91-49ec-aa3f-9eab2267f000')
        cy.get('.Users__Edit__content').should('exist')
        cy.get('.nav-link').contains('Password').click()
        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.Users__Edit__content').screenshot('application/administration/users/detail/password', { padding: [0, -280, -10, 330] })
    })
})
