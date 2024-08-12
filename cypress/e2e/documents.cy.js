describe('Documents', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/documents')
        cy.get('.list-group-item').should('exist')

        cy.get('.dropdown-toggle').last().click()
        cy.get('.dropdown-item').should('be.visible')

        cy.screenshot('application/documents/index/list')
    })
})
