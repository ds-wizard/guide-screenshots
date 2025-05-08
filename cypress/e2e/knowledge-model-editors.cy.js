describe('Knowledge Models / Editors', () => {
    beforeEach(() => {
        cy.loginAs('dataSteward')
    })

    it('List', () => {
        cy.visitApp('/knowledge-model-editors')
        cy.get('.list-group-item').should('exist')

        cy.get('.col-list').screenshot('application/knowledge-models/editors/index/knowledge-model-editors-list', { padding: [20, 0, 20, 0] })
    })

    it('Create', () => {
        cy.visitApp('/knowledge-model-editors/create')
        cy.wait(1000)

        cy.get('.col-detail').screenshot('application/knowledge-models/editors/create/create-km', { padding: [0, 0, -40, 0] })
    })

    it('Detail', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8')
        cy.collapseSidebar()
        cy.wait(1000)
 
        cy.get('.input-children').should('exist')
        cy.get('.editor-content').invoke('attr', 'style', 'opacity: 1')

        cy.screenshot('application/knowledge-models/editors/detail/index/knowledge-model-editor')
    })

    it('Detail / Knowledge Model', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8/edit/f0ef08fd-d733-465c-bc66-5de0b826c41b')
        cy.collapseSidebar()

        cy.get('.input-children').should('exist')
        cy.get('.editor-content').invoke('attr', 'style', 'opacity: 1')

        // Navigation
        cy.get('.fa-comment').should('be.visible')
        cy.get('.pane-first-view').screenshot('application/knowledge-models/editors/detail/knowledge-model/navigation', { padding: [0, 0, -300, 0] })

        // Editor actions
        cy.wait(1000)
        cy.get('.editor-title-buttons').screenshot('application/knowledge-models/editors/detail/knowledge-model/editor-action-buttons', { padding: [10, 10, 10, 10] })

        // Editor form
        cy.get('.editor-content').screenshot('application/knowledge-models/editors/detail/knowledge-model/editor-form', { padding: [5, 5, 5, 5] })

        // Warnings
        cy.get('.item ').contains('Warnings').click()
        cy.get('.editor-right-panel').screenshot('application/knowledge-models/editors/detail/knowledge-model/warnings', { padding: [40, 10, -550, 0] })
    })

    it('Detail / Phases', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8/phases')
        cy.collapseSidebar()
        
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/phases/phases-editor')
    })

    it('Detail / Question Tags', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8/question-tags')
        cy.collapseSidebar()
        
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/question-tags/question-tag-editor')
    })

    it('Detail / Preview', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8/preview')
        cy.collapseSidebar()
        
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/preview/preview')
    })

    it('Detail / Settings', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8/settings')
        cy.collapseSidebar()
        
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/settings/settings-form')
    })

    it('Detail / Publish', () => {
        cy.visitApp('/knowledge-model-editors/editor/d1fb23b7-c87f-4ff0-84e7-c8b1a1466dd8')
        cy.get('.KMEditor__Editor').should('exist')
        cy.get('.DetailNavigation__Row__Section__Actions .btn').contains('Publish').click()
        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')

        cy.getCy('modal_km-editor_publish').screenshot('application/knowledge-models/editors/detail/publish/publish-modal', { padding: [10, 10, 10, 10] })
    })

    it('Migration', () => {
        cy.visitApp('/knowledge-model-editors')
        cy.get('.KMEditor__Index').should('exist')

        // update available badge
        cy.getListingItem('Chemistry').screenshot('application/knowledge-models/editors/migration/update-available', { padding: [0, -700, 0, 0] })

        // create migration modal
        cy.getCy('km-editor_list_outdated-badge').click()
        cy.get('#targetPackageId').should('exist')

        cy.getCy('modal_km-editor-update').screenshot('application/knowledge-models/editors/migration/create-migration-modal')

        // migration itself
        cy.fillFields({ s_targetPackageId: 'dsw:root:2.4.4' })
        cy.clickModalAction()
        cy.getCy('km-editor_migration').should('exist')
        cy.getCy('km-migration_apply-button').click()
        cy.contains('Edit question').should('exist')
        cy.screenshot('application/knowledge-models/editors/migration/migration')

        // clean up
        cy.visitApp('/knowledge-model-editors')
        cy.get('.KMEditor__Index').should('exist')
        cy.clickListingItemAction('Chemistry', 'cancel-migration')
    })
})
