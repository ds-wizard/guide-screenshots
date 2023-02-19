describe('Documents', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')
        cy.get('.list-group-item').should('exist')

        cy.screenshot('application/administration/locales/index/list')
    })


    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales/dsw:cs:0.2.0')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/administration/locales/detail/detail')
    })


    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales/import?localeId=dsw:nl:0.2.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/administration/locales/import/registry', { padding: [10, 10, 10, 10] })
    })


    it('Import from file', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales/import')
        cy.getCy('locale_import_nav_file').click()

        cy.get('.col-detail').screenshot('application/administration/locales/import/file', { padding: [10, 10, 10, 10] })
    })
})
