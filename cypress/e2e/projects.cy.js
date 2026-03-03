describe('Projects', () => {
  it('List', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects')
    cy.openLastItemDropdown()
    cy.get('.col-list').screenshot('application/projects/list/index/project-list', { padding: [20, 0, 130, 0]})
  })

  it('Create', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/create')
    cy.get('.container').screenshot('application/projects/list/create/project-create', { padding: [10, 10, 10, 10] })

    cy.visitApp('/projects/create')
    cy.getCy('project_create_nav_custom').click()
    cy.fillFields({ th_knowledgeModelPackageUuid: 'common'})
    cy.get('#question-tags-filter').click()
    cy.getCy('tag').contains('Horizon Europe DMP').click()
    cy.getCy('tag').contains('maDMP').click()
    cy.get('.container').screenshot('application/projects/list/create/project-create-custom', { padding: [10, 10, 10, 10] })
  })

  it('Detail', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()
    cy.wait(2000)
    
    cy.screenshot('application/projects/list/detail/index/questionnaire')
  })

  it('Questionnaire', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()
    
    // Chapter list
    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.25 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')
    cy.wait(500)
    cy.get('.NavigationTree').screenshot('application/projects/list/detail/questionnaire/chapter-list')

    // Phase selection
    cy.get('.questionnaire__left-panel__phase').screenshot('application/projects/list/detail/questionnaire/phase-selection')
    cy.getCy('phase-selection').click()
    cy.getCy('phase-option').contains('Before Finishing the Project').click()
    cy.getCy('phase-selection').click()
    cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
    cy.getCy('modal_phase-selection').screenshot('application/projects/list/detail/questionnaire/phase-selection-modal')
    cy.getCy('phase-option').contains('Before Submitting the Proposal').click()
    cy.getCy('modal_phase-selection').should('not.be.visible')

    // Resize chapter list
    cy.get('.pane-first-view').invoke('attr', 'style', 'display: flex; flex: 0.35 1 0%; width: 100%; height: 100%; overflow: hidden; box-sizing: border-box; position: relative;')

    // Different question types'
    cy.get('#question-6155ad47-3d1e-4488-9f2a-742de1e56580').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/value-question', { padding: [0, 10, -25, 10] })
    cy.get('#question-829dcda6-db8a-40ac-819a-92b9b52490f5').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/multi-choice-question', { padding: [0, 10, -400, 10], capture: 'viewport' })

    cy.get('.nav-link').contains('Creating and collecting data').click()
    cy.get('#question-ecff019a-d4e6-44c6-a8fe-c84eb15ed8b7').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/options-question')

    cy.get('.nav-link').contains('Interpreting data').click()
    cy.get('#question-a797cab9-0829-4787-a096-1b5cedc9147f').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/list-of-items-question', { padding: [0, 0, -1100, 0] })
    cy.get('#question-63ed4349-9743-4fd1-96df-73dbb7e4f05b').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/integration-question', { padding: [0, 10, -25, 10] })

    // Item Select and File questions are taken from different Project
    cy.visitApp('/projects/b858f6fd-626d-46fc-93d8-a482ed7f4a16')
    cy.collapseSidebar()
    cy.get('#question-3e539cde-b38c-40fe-ad66-b7f5bf4426ca').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/item-select-question', { padding: [0, 10, -25, 10] })
    cy.get('#question-a105fda6-6970-4cd1-9536-0ec7b8448b6d').scrollIntoView().screenshot('application/projects/list/detail/questionnaire/file-question', { padding: [0, 10, -25, 10] })

    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    // Questionnaire view options
    cy.get('.btn-link').contains('View').click()
    cy.get('.dropdown-menu.show').screenshot('application/projects/list/detail/questionnaire/view-options', { padding: [38, 5, 5, 5]})

    // Warnings
    cy.get('.item').contains('Warnings').click()
    cy.get('.questionnaire__right-panel .todos div').screenshot('application/projects/list/detail/questionnaire/warnings', { padding: [55, 0, 30, 200] })

    // Comments
    cy.get('.item').contains('Comments').click()
    cy.get('.question').contains('Will you be using').click()
    cy.get('.Comments').screenshot('application/projects/list/detail/questionnaire/comments', { padding: [55, 30, 0, 300] })

    // TODOs
    cy.get('.item').contains('TODOs').click()
    cy.wait(200)
    cy.get('.item').contains('TODOs').screenshot('application/projects/list/detail/questionnaire/todos', { padding: [0, 300, 200, 5] })

    // Version History
    cy.get('.item').contains('Version history').click()
    cy.get('.history-month:nth-last-child(2) .history-day:nth-child(2) .date').click()
    cy.get('.history-month:nth-last-child(2) .history-day:nth-child(2) .history-event:first-child .ListingDropdown').click()
    cy.getCy('listing-item_action_view-questionnaire').should('be.visible')
    cy.get('.questionnaire__right-panel').screenshot('application/projects/list/detail/questionnaire/version-history')
  })

  it('Metrics', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    cy.getCy('project_nav_metrics').click()
    cy.get('.questionnaire__summary-report').should('exist')
    cy.screenshot('application/projects/list/detail/metrics/metrics')
  })

  it('Preview', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    // Template not set
    cy.getCy('project_nav_preview').click()
    cy.getCy('illustrated-message_template-not-set').should('exist')
    cy.screenshot('application/projects/list/detail/preview/document-template-not-set')

    // Set Horizon Europe PDF
    cy.getCy('project_nav_settings').click()
    cy.fillFields({
      'th_documentTemplateUuid': 'Horizon Europe'
    })
    cy.get('.export-link').contains('HTML').click()
    cy.getCy('form_submit', ':visible').click()

    // HTML preview
    cy.getCy('project_nav_preview').click()
    cy.wait(4000)
    cy.get('iframe').should('be.visible')
    cy.wait(2000)
    cy.screenshot('application/projects/list/detail/preview/preview-html')

    // Set Horizon Europe Word
    cy.getCy('project_nav_settings').click()
    cy.get('.export-link').contains('MS Word').click()
    cy.getCy('form_submit', ':visible').click()

    // Download preview
    cy.getCy('project_nav_preview').click()
    cy.getCy('illustrated-message_format-not-supported').should('exist')
    cy.screenshot('application/projects/list/detail/preview/download')

    // Reset template after screenshots
    cy.getCy('project_nav_settings').click()
    cy.get('.typehint-input-value > .ms-2').click()
    cy.getCy('form_submit', ':visible').click()
  })

  it('Documents', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    // Document list
    cy.getCy('project_nav_documents').click()
    cy.get('.list-group-item').should('exist')
    
    cy.get('.dropdown-toggle').last().click({ force: true })
    cy.get('.dropdown-item').should('be.visible')
    cy.screenshot('application/projects/list/detail/documents/list')

    // New document
    cy.get('.btn').contains('New document').click()
    cy.fillFields({
      th_documentTemplateUuid: 'Horizon Europe DMP'
    })
    cy.get('.export-link').contains('PDF').click()
    cy.get('.container').screenshot('application/projects/list/detail/documents/new', { padding: [10, 10, 10, 10] })

    // Document submission
    cy.getCy('project_nav_documents').click()
    cy.clickListingItemAction('My Experiment v1', 'submit')
    cy.get('.form-radio-group').should('exist')
    cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
    cy.get('.modal-cover.visible .modal-dialog').screenshot('application/projects/list/detail/documents/submission', { padding: [20, 20, 20, 20] })
    cy.get('.modal-cover.visible .btn').contains('Cancel').click()

  })

  it('Files', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/b858f6fd-626d-46fc-93d8-a482ed7f4a16/files')
    cy.collapseSidebar()

    cy.openLastItemDropdown()

    cy.screenshot('application/projects/list/detail/files/files')
  })

  it('Settings', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()
    
    cy.getCy('project_nav_settings').click()
    cy.get('.form-group > .form-control').should('be.visible')
    cy.screenshot('application/projects/list/detail/settings/settings')
  })

   it('Sharing', () => {
    cy.loginAs('researcher')
    cy.visitApp('/projects/c66ab9be-dd94-4dbd-92a5-ceb31658a99b')
    cy.collapseSidebar()

    cy.getCy('project_nav_settings').click().blur()
    cy.get('.ShareDropdown').click()
    cy.get('.dropdown-menu').screenshot('application/projects/list/detail/sharing/share-dropdown', { padding: [40, 5, 5, 5] })

    cy.getCy('project_detail_share-button').click()
    cy.checkToggle('visibilityEnabled')
    cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')
    cy.get('.form-group').contains('Other logged-in users can').should('be.visible')
    cy.get('.modal-cover.visible .modal-dialog').screenshot('application/projects/list/detail/sharing/share-modal', { padding: [20, 20, 20, 20] })
  })

  it.only('Migration', () => {
    cy.loginAs('researcher')
    cy.collapseSidebar()
    cy.visitApp('/projects/create-migration/b858f6fd-626d-46fc-93d8-a482ed7f4a16')

    cy.get('.Questionnaires__CreateMigration').should('exist')
    cy.get('.tag-selection').should('exist')
    cy.screenshot('application/projects/list/migration/create')

    // Migration screenshot
    cy.get('.btn').contains('Create').click()
    cy.get('.changes-view').should('exist')
    cy.screenshot('application/projects/list/migration/migration')

    // Delete migration to clean up
    cy.visitApp('/projects')
    cy.clickListingItemAction('0.0.5', 'cancel-migration')
  })

  it('Menu Files', () => {
    cy.loginAs('admin')
    cy.visitApp('/project-files')

    cy.openLastItemDropdown()

    cy.screenshot('application/projects/files/files')

  })

  it('Menu Documents', () => {
      cy.loginAs('admin')
      cy.visitApp('/project-documents')

      cy.openLastItemDropdown()

      cy.screenshot('application/projects/documents/documents')
  })
})
