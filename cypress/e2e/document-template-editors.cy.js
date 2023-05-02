describe('Document Template Editors', () => {
    it('List', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors')
        cy.get('.list-group-item').should('exist')

        cy.wait(500)
        cy.get('code.fragment').invoke('text', 'dsw:questionnaire-report:2.9.0')

        cy.get('.dropdown-toggle').last().click()

        cy.screenshot('application/document-templates/editors/index/list')
    })

    it('Create', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/create')
        cy.get('.col-detail').should('exist')

        cy.get('.col-detail').screenshot('application/document-templates/editors/create/create-document-template', { padding: [10, 10, 10, 10] })
    })

    it('Detail', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0/settings')
        cy.get('.DocumentTemplateEditor__MetadataEditor').should('exist')

        cy.screenshot('application/document-templates/editors/detail/index/editor')
    })

    it('Detail - Files', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0')
        cy.get('.DocumentTemplateEditor').should('exist')

        cy.getCy('dt-editor_file-tree_file').contains('default.css').click()
        cy.getCy('dt-editor_file-tree_file').contains('default.html.j2').click()
        cy.getCy('dt-editor_file-tree_file').contains('default.md.j2').click()
        cy.get('.fa-columns').click()

        cy.screenshot('application/document-templates/editors/detail/files/files')
    })

    it('Detail - Preview', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0/preview')
        cy.get('.DocumentTemplateEditor__PreviewEditor').should('exist')

        cy.get('.DocumentTemplateEditor').screenshot('application/document-templates/editors/detail/preview/preview', { padding: [0, 0, -400, 0] })
    })

    it('Detail - Publish', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0/preview')
        cy.get('.DocumentTemplateEditor__PreviewEditor').should('exist')

        cy.get('.DetailNavigation__Row__Section__Actions .btn').contains('Publish').click()

        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')

        cy.getCy('modal_document-template-editor_publish').screenshot('application/document-templates/editors/detail/publish/modal', { padding: [10, 10, 10, 10] })
    })

    it('Detail - Template (KMs)', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0/settings')
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

        cy.get('.form-group').filter(':visible').screenshot('application/document-templates/editors/detail/template/allowed-kms', { padding: [10, 10, 10, 10] })
    })

    it('Detail - Template (Formats)', () => {
        cy.loginAs('admin')
        cy.visitApp('/document-template-editors/dsw.mediakit:questionnaire-report:2.9.0/settings')
        cy.get('.DocumentTemplateEditor__MetadataEditor').should('exist')

        cy.getCy('dt_template-nav_formats').click()

        cy.get('.DocumentTemplateEditor__MetadataEditor__Content > div > .form-group > div > .card').last().scrollIntoView()
        cy.get('.DocumentTemplateEditor__MetadataEditor__Content > div > .form-group > div > .card').last().screenshot('application/document-templates/editors/detail/template/formats', { padding: [10, 10, 10, 10] })
    })
})
