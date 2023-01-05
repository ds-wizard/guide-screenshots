describe('Projects', () => {
  it('Detail', () => {
    cy.loginAs('admin')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    cy.wait(2000)
    cy.screenshot('projects/detail/index/questionnaire')

    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.25 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')
    cy.get('.questionnaire__left-panel__phase').screenshot('projects/detail/questionnaire/phase-selection')
    cy.get('.NavigationTree').screenshot('projects/detail/questionnaire/chapter-list')

    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.35 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')

    cy.get('#question-6155ad47-3d1e-4488-9f2a-742de1e56580').scrollIntoView().screenshot('projects/detail/questionnaire/value-question', { padding: [0, 10, -25, 10] })
    cy.get('#question-829dcda6-db8a-40ac-819a-92b9b52490f5').scrollIntoView().screenshot('projects/detail/questionnaire/mutli-choice-question', { padding: [0, 10, -300, 10], capture: 'viewport' })

    cy.get('.nav-link').contains('Re-using data').click()
    cy.get('#question-efc80cc8-8318-4f8c-acb7-dc1c60e491c1').scrollIntoView().screenshot('projects/detail/questionnaire/options-question')

    cy.get('.nav-link').contains('Interpreting data').click()
    cy.get('#question-a797cab9-0829-4787-a096-1b5cedc9147f').scrollIntoView().screenshot('projects/detail/questionnaire/list-question')
    cy.get('#question-63ed4349-9743-4fd1-96df-73dbb7e4f05b').scrollIntoView().screenshot('projects/detail/questionnaire/integration-question', { padding: [0, 10, -25, 10] })
  })
})
