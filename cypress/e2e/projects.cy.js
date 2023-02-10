describe('Projects', () => {
  it('Create', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/create/from-template')
    cy.get('.Questionnaires__Create').screenshot('application/projects/list/create/project-create', { padding: [10, 0, -35, 0] })
  })

  it('Detail', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    cy.wait(2000)
    cy.screenshot('application/projects/list/detail/index/questionnaire')

    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.25 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')
    cy.get('.questionnaire__left-panel__phase').screenshot('application/projects/list/detail/questionnaire/phase-selection')
    cy.get('.NavigationTree').screenshot('application/projects/list/detail/questionnaire/chapter-list')

    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.35 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')

    cy.get('#question-6155ad47-3d1e-4488-9f2a-742de1e56580').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/value-question', { padding: [0, 10, -25, 10] })
    cy.get('#question-829dcda6-db8a-40ac-819a-92b9b52490f5').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/mutli-choice-question', { padding: [0, 10, -300, 10], capture: 'viewport' })

    cy.get('.nav-link').contains('Re-using data').click()
    cy.get('#question-efc80cc8-8318-4f8c-acb7-dc1c60e491c1').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/options-question')

    cy.get('.nav-link').contains('Interpreting data').click()
    cy.get('#question-a797cab9-0829-4787-a096-1b5cedc9147f').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/list-question')
    cy.get('#question-63ed4349-9743-4fd1-96df-73dbb7e4f05b').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/integration-question', { padding: [0, 10, -25, 10] })

    cy.get('.btn-link').contains('View').click()
    cy.get('.btn-link').contains('View').focus()
    cy.get('.dropdown-menu.show').screenshot('application/projects/list/detail/questionnaire/view-options', { padding: [38, 5, 5, 5]})

    cy.get('.item').contains('Warnings').click()
    cy.get('.questionnaire__right-panel .todos div').screenshot('application/projects/list/detail/questionnaire/warnings', { padding: [55, 0, 30, 200] })

    cy.get('.item').contains('Comments').click()
    cy.get('.question').contains('Will you be using').click()
    cy.get('.Comments').screenshot('application/projects/list/detail/questionnaire/comments', { padding: [55, 30, 30, 300] })

    cy.get('.item').contains('TODOs').click()
    cy.wait(200)
    cy.get('.item').contains('TODOs').screenshot('application/projects/list/detail/questionnaire/todos', { padding: [0, 200, 200, 70] })

    cy.get('.item').contains('Version history').click()
    cy.get('.history-day:nth-child(2) .date').click()
    cy.get('.history-day:nth-child(2) .history-event:first-child .ListingDropdown').click()
    cy.get('.questionnaire__right-panel').screenshot('application/projects/list/detail/questionnaire/version-history')
  })
})
