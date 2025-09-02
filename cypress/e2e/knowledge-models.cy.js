describe('Knowledge Models', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models')
        
        cy.openLastItemDropdown()

        cy.screenshot('application/knowledge-models/list/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/dsw:root:latest')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/knowledge-models/list/detail/detail')
    })

    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/import?packageId=dsw:root:2.6.10')
        cy.wait(1000)

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
