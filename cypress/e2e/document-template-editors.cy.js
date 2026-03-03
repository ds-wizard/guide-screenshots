describe('Document Template Editors', () => {
    beforeEach(() => {
        cy.loginAs('admin')
    })
    
    it('List', () => {
        cy.visitApp('/document-template-editors')

        cy.get('code.fragment').invoke('text', 'dsw:questionnaire-report:2.9.0')

        cy.openLastItemDropdown()

        cy.screenshot('application/document-templates/editors/index/list')
    })

    it('Create', () => {
        cy.visitApp('/document-template-editors/create')
        cy.get('.container').should('exist')

        cy.get('.container').screenshot('application/document-templates/editors/create/create-document-template', { padding: [10, 10, 10, 10] })
    })

    it('Detail', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042/settings')
        cy.get('.DocumentTemplateEditor__MetadataEditor').should('exist')

        cy.screenshot('application/document-templates/editors/detail/index/editor')
    })

    it('Detail - Files', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042')
        cy.get('.DocumentTemplateEditor').should('exist')

        cy.getCy('dt-editor_file-tree_file').contains('default.css').click()
        cy.getCy('dt-editor_file-tree_file').contains('default.html.j2').click()
        cy.getCy('dt-editor_file-tree_file').contains('default.md.j2').click()
        cy.get('.fa-columns').click()
        cy.get('.tabs').eq('1').should('exist')

        cy.screenshot('application/document-templates/editors/detail/files/files')
    })

    it('Detail - Preview', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042/preview')
        cy.wait(4000)
        cy.get('iframe').should('be.visible')
        cy.wait(2000)

        cy.get('.DocumentTemplateEditor').screenshot('application/document-templates/editors/detail/preview/preview')
    })

    it('Detail - Publish', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042/preview')
        cy.get('.DocumentTemplateEditor__PreviewEditor').should('exist')

        cy.get('.DetailNavigation__Row__Section__Actions .btn').contains('Publish').click()

        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')

        cy.getCy('modal_document-template-editor_publish').screenshot('application/document-templates/editors/detail/publish/modal', { padding: [10, 10, 10, 10] })
    })

    it('Detail - Template (KMs)', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042/settings')
        cy.get('.DocumentTemplateEditor__MetadataEditor').should('exist')

        cy.getCy('dt_template-nav_knowledge-models').click()
        cy.getCy('form-group_list_add-button').click()
        cy.getCy('form-group_list_add-button').click()

        cy.fillFields({
            'allowedPackages\\.0\\.orgId': 'dsw',
            'allowedPackages\\.0\\.kmId': 'root',
            'allowedPackages\\.0\\.minVersion': '2.4.0',
            'allowedPackages\\.0\\.maxVersion': '',
        })

        cy.fillFields({
            'allowedPackages\\.1\\.orgId': 'dsw',
            'allowedPackages\\.1\\.kmId': 'lifesciences',
            'allowedPackages\\.1\\.minVersion': '2.3.0',
            'allowedPackages\\.1\\.maxVersion': '2.4.0',
        })

        cy.get('.DocumentTemplateEditor__MetadataEditor__Content .form-group').screenshot('application/document-templates/editors/detail/template/allowed-kms', { padding: [10, 10, 10, 10] })
    })

    it('Detail - Template (Formats)', () => {
        cy.visitApp('/document-template-editors/75de312d-9e49-4711-ab96-a3dbf462c042/settings')
        cy.get('.DocumentTemplateEditor__MetadataEditor').should('exist')

        cy.getCy('dt_template-nav_formats').click()

        cy.get('.DocumentTemplateEditor__MetadataEditor__Content > div > .form-group > div > .card').last().scrollIntoView()
        cy.get('.DocumentTemplateEditor__MetadataEditor__Content > div > .form-group > div > .card').last().screenshot('application/document-templates/editors/detail/template/formats', { padding: [10, 10, -100, 10] })
    })
})
