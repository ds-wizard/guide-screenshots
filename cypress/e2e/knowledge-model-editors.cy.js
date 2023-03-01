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
        cy.get('.col-detail').screenshot('application/knowledge-models/editors/detail/settings/settings-form', { padding: [-10, 10, -10, 10] })
    })

    it('Detail / Publishing', () => {
        cy.visitApp('/km-editor/publish/fc0c83ff-f38b-4645-91bf-7deae343778d')
        cy.get('.KMEditor__Publish').should('exist')
        cy.screenshot('application/knowledge-models/editors/detail/publishing/publish-form', { capture: 'viewport' })
    })
})
