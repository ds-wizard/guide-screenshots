describe('Projects', () => {
  it('Detail', () => {
    cy.loginAs('admin')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    cy.wait(2000)
    cy.screenshot('projects/detail/index/questionnaire')

    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.25 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')
    cy.get('.questionnaire__left-panel__phase').screenshot('projects/detail/questionnaire/phase-selection', { padding: 10 })
    cy.get('.NavigationTree').screenshot('projects/detail/questionnaire/chapter-list', { padding: 10 })
  })
})
