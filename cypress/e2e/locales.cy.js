describe('Locales', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)

        cy.get('.dropdown-toggle').last().click()

        cy.screenshot('application/administration/locales/index/list')
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')
        cy.clickListingItemAction('dsw:cs', 'view')
        cy.get('.DetailPage__Content').should('exist')

        cy.screenshot('application/administration/locales/detail/detail')
    })

    it('Import from Registry', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales/import?localeId=dsw:nl:4.2.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/administration/locales/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales/import')
        cy.getCy('locale_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/administration/locales/import/file', { padding: [10, 10, 10, 10] })
    })
})
