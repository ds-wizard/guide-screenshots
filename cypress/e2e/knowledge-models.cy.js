describe('Knowledge Models', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models')
        
        cy.openLastItemDropdown()

        cy.screenshot('application/knowledge-models/list/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/24811ad5-ee3b-4e8b-8cf1-dbbd3dc45614')
        cy.getCy('detail-page_content').should('exist')

        cy.screenshot('application/knowledge-models/list/detail/detail')
    })

    it('Compare', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/compare?leftKnowledgeModelPackageId=24811ad5-ee3b-4e8b-8cf1-dbbd3dc45614')
        cy.wait(1000)
        cy.getCy('modal_confirm').screenshot('application/knowledge-models/list/compare/compare')
    })

    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/import')

        cy.get('.col-detail').screenshot('application/knowledge-models/list/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/import')
        cy.getCy('km_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/knowledge-models/list/import/file', { padding: [10, 10, 10, 10] })
    })

    it('Secrets', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-model-secrets')
        cy.get('.fa-lock').should('be.visible')

        cy.screenshot('application/knowledge-models/secrets/secrets')
    })
})
