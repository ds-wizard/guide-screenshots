describe('Document Templates', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-templates')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)

        cy.get('.dropdown-toggle').last().click()

        cy.screenshot('application/document-templates/list/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-templates/dsw:horizon-europe-dmp:1.3.0')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/document-templates/list/detail/detail')
    })

    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-templates/import?documentTemplateId=dsw:questionnaire.report:2.8.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/document-templates/list/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-templates/import')
        cy.getCy('template_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/document-templates/list/import/file', { padding: [10, 10, 10, 10] })
    })
})
