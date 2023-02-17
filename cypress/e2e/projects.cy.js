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


    // # Project Detail -------------------------------------------------------
    
    cy.screenshot('application/projects/list/detail/index/questionnaire')


    // # Questionnaire --------------------------------------------------------
    
    // Chapter list
    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.25 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')
    cy.get('.questionnaire__left-panel__phase').screenshot('application/projects/list/detail/questionnaire/phase-selection')
    cy.get('.NavigationTree').screenshot('application/projects/list/detail/questionnaire/chapter-list')

    // Resize chapter list
    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.35 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')

    // Different question types
    cy.get('#question-6155ad47-3d1e-4488-9f2a-742de1e56580').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/value-question', { padding: [0, 10, -25, 10] })
    cy.get('#question-829dcda6-db8a-40ac-819a-92b9b52490f5').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/mutli-choice-question', { padding: [0, 10, -300, 10], capture: 'viewport' })

    cy.get('.nav-link').contains('Re-using data').click()
    cy.get('#question-efc80cc8-8318-4f8c-acb7-dc1c60e491c1').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/options-question')

    cy.get('.nav-link').contains('Interpreting data').click()
    cy.get('#question-a797cab9-0829-4787-a096-1b5cedc9147f').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/list-question')
    cy.get('#question-63ed4349-9743-4fd1-96df-73dbb7e4f05b').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/integration-question', { padding: [0, 10, -25, 10] })

    // Questionnaire view options
    cy.get('.btn-link').contains('View').click()
    cy.get('.btn-link').contains('View').focus()
    cy.get('.dropdown-menu.show').screenshot('application/projects/list/detail/questionnaire/view-options', { padding: [38, 5, 5, 5]})

    // Warnings
    cy.get('.item').contains('Warnings').click()
    cy.get('.questionnaire__right-panel .todos div').screenshot('application/projects/list/detail/questionnaire/warnings', { padding: [55, 0, 30, 200] })

    // Comments
    cy.get('.item').contains('Comments').click()
    cy.get('.question').contains('Will you be using').click()
    cy.get('.Comments').screenshot('application/projects/list/detail/questionnaire/comments', { padding: [55, 30, 30, 300] })

    // TODOs
    cy.get('.item').contains('TODOs').click()
    cy.wait(200)
    cy.get('.item').contains('TODOs').screenshot('application/projects/list/detail/questionnaire/todos', { padding: [0, 200, 200, 70] })

    // Version History
    cy.get('.item').contains('Version history').click()
    cy.get('.history-day:nth-child(2) .date').click()
    cy.get('.history-day:nth-child(2) .history-event:first-child .ListingDropdown').click()
    cy.get('.questionnaire__right-panel').screenshot('application/projects/list/detail/questionnaire/version-history')


    // # Metrics --------------------------------------------------------------

    cy.getCy('project_nav_metrics').click().blur()
    cy.get('.questionnaire__summary-report').should('exist')
    cy.screenshot('application/projects/list/detail/metrics/metrics')


    // # Preview --------------------------------------------------------------

    // Template not set
    cy.getCy('project_nav_preview').click().blur()
    cy.getCy('illustrated-message_template-not-set').should('exist')
    cy.screenshot('application/projects/list/detail/preview/document-template-not-set')

    // Set Horizon Europe PDF
    cy.getCy('project_nav_settings').click()
    cy.fillFields({
      'th_documentTemplateId': 'Horizon Europe'
    })
    cy.get('.export-link').contains('HTML').click()
    cy.get('.text-end .btn').contains('Save').click()

    // HTML preview
    cy.getCy('project_nav_preview').click().blur()
    cy.wait(4000)
    cy.get('iframe').should('exist')
    cy.wait(2000)
    cy.screenshot('application/projects/list/detail/preview/preview-html')

    // Set Horizon Europe Word
    cy.getCy('project_nav_settings').click()
    cy.get('.export-link').contains('MS Word').click()
    cy.get('.text-end .btn').contains('Save').click()

    // Download preview
    cy.getCy('project_nav_preview').click().blur()
    cy.wait(4000)
    cy.getCy('illustrated-message_format-not-supported').should('exist')
    cy.screenshot('application/projects/list/detail/preview/download')

    // Reset template after screenshots
    cy.getCy('project_nav_settings').click()
    cy.get('.TypeHintInput__Value a').click()
    cy.get('.text-end .btn').contains('Save').click()


    // # Documents ------------------------------------------------------------

    // Document list
    cy.getCy('project_nav_documents').click().blur()
    cy.get('.list-group-item').should('exist')
    cy.screenshot('application/projects/list/detail/documents/list')

    // New document
    cy.get('.btn').contains('New document').click()
    cy.fillFields({
      th_documentTemplateId: 'Horizon Europe DMP'
    })
    cy.get('.export-link').contains('PDF').click()
    cy.get('.col-detail').screenshot('application/projects/list/detail/documents/new', { padding: [20, 0, 20, 0] })

    // Document submission
    cy.getCy('project_nav_documents').click().blur()
    cy.clickListingItemAction('My Experiment v1', 'submit')
    cy.get('.form-radio-group').should('exist')
    cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
    cy.get('.modal-cover.visible .modal-dialog').screenshot('application/projects/list/detail/documents/submission', { padding: [20, 20, 20, 20] })


    // # Settings -------------------------------------------------------------
    
    cy.getCy('project_nav_settings').click().blur()
    cy.screenshot('application/projects/list/detail/settings/settings')


    // # Sharing --------------------------------------------------------------

    cy.getCy('project_detail_share-button').click()
    cy.checkToggle('visibilityEnabled')
    cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
    cy.get('.modal-cover.visible .modal-dialog').screenshot('application/projects/list/detail/sharing/share-modal', { padding: [20, 20, 20, 20] })
  })
})
