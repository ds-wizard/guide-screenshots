describe('Locales', () => {
    beforeEach(() => {
        cy.loginAs('admin')
    })

    it('List', () => {
        cy.visitApp('/locales')
        
        cy.openLastItemDropdown()

        cy.screenshot('application/administration/locales/index/list')
    })

    it('Detail', () => {
        cy.visitApp('/locales')
        cy.clickListingItemAction('dsw.mediakit:fr', 'view')
        cy.get('.DetailPage__Content').should('exist')
        cy.get('p > a > img')
            .should('have.length', 4)
            .and('be.visible')

        cy.screenshot('application/administration/locales/detail/detail')
    })

    it('Import from Registry', () => {
        cy.visitApp('/locales/import?localeId=dsw:nl:4.18.0')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/administration/locales/import/registry', { padding: [10, 10, 10, 10] })
    })

    it('Import from file', () => {
        cy.visitApp('/locales/import')
        cy.getCy('locale_import_nav_file').click()
        cy.get('.dropzone').should('exist')

        cy.get('.col-detail').screenshot('application/administration/locales/import/file', { padding: [10, 10, 10, 10] })
    })

    it('Create', () => {
        cy.visitApp('/locales/create')
        cy.fillFields({
            name: 'French',
            description: 'French locale for Wizard UI',
            code: 'fr',
            localeId: 'fr',
            localeMajor: '0',
            localeMinor: '0',
            localePatch: '1',
            license: 'CC-BY-4.0',
            readme: 'French Locale for Wizard Client',
            appMajor: '4',
            appMinor: '17',
            appPatch: '0',
        })

        cy.get('.col-detail').screenshot('application/administration/locales/create/form')
    })
})
