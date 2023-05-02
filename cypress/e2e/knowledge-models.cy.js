describe('Knowledge Models', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)

        cy.get('.dropdown-toggle').last().click()

        cy.screenshot('application/knowledge-models/list/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/dsw:root:2.4.4')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/knowledge-models/list/detail/detail')
    })

    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/import?packageId=dsw:root:2.5.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/knowledge-models/list/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.loginAs('admin')
        cy.visitApp('/knowledge-models/import')
        cy.getCy('km_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/knowledge-models/list/import/file', { padding: [10, 10, 10, 10] })
    })
})
