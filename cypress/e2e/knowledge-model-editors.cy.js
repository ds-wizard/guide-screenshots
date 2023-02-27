describe('Knowledge Models / Editors', () => {
    it('Create', () => {
        cy.loginAs('dataSteward')
        cy.visitApp('/km-editor/create')
        cy.get('.col-detail').screenshot('application/knowledge-models/editors/create/create-km', { padding: [0, 0, -40, 0] })
    })

    it('Detail', () => {
        cy.loginAs('dataSteward')
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.input-children').should('exist')
        cy.get('.editor-content').invoke('attr', 'style', 'opacity: 1')

        cy.screenshot('application/knowledge-models/editors/detail/index/km-editor')
    })
})
