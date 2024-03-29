describe('Knowledge Models / Editors', () => {
    beforeEach(() => {
        cy.loginAs('dataSteward')
    })

    it('List', () => {
        cy.visitApp('/km-editor')
        cy.get('.list-group-item').should('exist')
        cy.get('.col-list').screenshot('application/knowledge-models/editors/index/knowledge-model-editors-list', { padding: [20, 0, 20, 0] })
    })

    it('Create', () => {
        cy.visitApp('/km-editor/create')
        cy.get('.col-detail').screenshot('application/knowledge-models/editors/create/create-km', { padding: [0, 0, -40, 0] })
    })

    it('Detail', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.input-children').should('exist')
        cy.get('.editor-content').invoke('attr', 'style', 'opacity: 1')
        cy.screenshot('application/knowledge-models/editors/detail/index/km-editor')
    })

    it('Detail / Knowledge Model', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/edit/f0ef08fd-d733-465c-bc66-5de0b826c41b')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.input-children').should('exist')
        cy.get('.editor-content').invoke('attr', 'style', 'opacity: 1')

        // Navigation
        cy.get('.pane-first-view').screenshot('application/knowledge-models/editors/detail/knowledge-model/navigation', { padding: [0, 0, -300, 0] })

        // Editor actions
        cy.get('.editor-title-buttons').screenshot('application/knowledge-models/editors/detail/knowledge-model/editor-action-buttons', { padding: [10, 10, 10, 10] })

        // Editor form
        cy.get('.editor-content').screenshot('application/knowledge-models/editors/detail/knowledge-model/editor-form', { padding: [5, 5, 5, 5] })

        // Warnings
        cy.get('.item ').contains('Warnings').click()
        cy.get('.right-panel ul').screenshot('application/knowledge-models/editors/detail/knowledge-model/warnings', { padding: [60, 10, 20, 20] })
    })

    it('Detail / Phases', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/phases')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/phases/phases-editor')
    })

    it('Detail / Question Tags', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/question-tags')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/question-tags/question-tag-editor')
    })

    it('Detail / Preview', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/preview')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/preview/preview')
    })

    it('Detail / Settings', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/settings')
        cy.collapseSidebar()
        cy.wait(1000)
        cy.get('.col-full').screenshot('application/knowledge-models/editors/detail/settings/settings-form')
    })

    it('Detail / Publish', () => {
        cy.visitApp('/km-editor/editor/fc0c83ff-f38b-4645-91bf-7deae343778d/settings')
        cy.get('.KMEditor__Editor').should('exist')
        cy.get('.DetailNavigation__Row__Section__Actions .btn').contains('Publish').click()
        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
        cy.getCy('modal_km-editor_publish').screenshot('application/knowledge-models/editors/detail/publish/publish-modal', { padding: [10, 10, 10, 10] })
    })

    it('Migration', () => {
        cy.visitApp('/km-editor')
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
        cy.visitApp('/km-editor')
        cy.get('.KMEditor__Index').should('exist')
        cy.clickListingItemAction('Chemistry', 'cancel-migration')
    })
})
