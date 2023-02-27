describe('Knowledge Models / Editors', () => {
    it('Create', () => {
        cy.loginAs('researcher')
        cy.visitApp('/km-editor/create')
        cy.get('.col-detail').screenshot('application/knowledge-models/editors/create/create-km', { padding: [0, 0, -40, 0] })
    })
})
