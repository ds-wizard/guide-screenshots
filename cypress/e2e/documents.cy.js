describe('Documents', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/documents')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)

        cy.screenshot('application/documents/index/list')
    })
})
