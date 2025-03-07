describe('Document Templates', () => {
    beforeEach(() => {
        cy.loginAs('admin')
    })

    it('List', () => {
        cy.visitApp('/document-templates')
        
        cy.openLastItemDropdown()

        cy.screenshot('application/document-templates/list/index/list')
    })

    it('Detail', () => {
        cy.visitApp('/document-templates/dsw:horizon-europe-dmp:latest')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/document-templates/list/detail/detail')
    })

    it('Import from Registry', () => {
        cy.visitApp('/document-templates/import?documentTemplateId=dsw:questionnaire.report:2.12.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/document-templates/list/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.visitApp('/document-templates/import')
        cy.getCy('template_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/document-templates/list/import/file', { padding: [10, 10, 10, 10] })
    })
})
