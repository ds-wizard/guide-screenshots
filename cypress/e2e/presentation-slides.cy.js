// Opt-in presentation captures; not part of cypress/e2e/5.0 or the guide map.
const config = Cypress.expose('capture')
const f = config.fixture
const scene = id => config.selected.find(s => s.id === id)
function ready() {
  cy.get('[data-cy="questionnaire_question-title"]', { timeout: 60000 }).first().should('exist')
  cy.get('.ui-async--loading:visible,.ui-page-loading:visible').should('not.exist')
}
function visit(project, chapter) {
  cy.loginAs()
  cy.visitTenant('/projects/' + project + '?questionPath=' + chapter)
  ready()
}
function question(uuid) {
  return cy.get('.c-questionnaire-question[data-path$="' + uuid + '"]').first()
}
function capture(id, selector, padding = 10) {
  const s = scene(id)
  cy.captureRegion(s, selector, { padding, keepFocus: id.includes('search'), through: id === 'slide-26-open-comments' ? '.c-questionnaire-comments__editor' : (id.includes('integration-search') ? '[data-presentation-question="integration"] [role="listbox"]' : (id === 'slide-25-external-record' ? '[data-presentation-external]' : undefined)) })
}
describe('Presentation slides (excluded from user-guide copying)', () => {
  afterEach(function () {
    if (this.currentTest.state === 'failed') cy.document().then(d => cy.task('capture:diagnose', {
      id: this.currentTest.title, url: d.location.href, bodyText: d.body.innerText.slice(0,4000),
      headings: [...d.querySelectorAll('h1,h2,h3')].map(e => e.textContent),
      inputs: [...d.querySelectorAll('input')].map(e => ({ id: e.id, role: e.getAttribute('role') })),
      buttons: [...d.querySelectorAll('button,a[role="option"]')].map(e => ({ label: e.textContent?.trim().slice(0,100), cy: e.dataset.cy }))
    }, { log: false }))
  })
  it('slide-23-repository-question', () => {
    cy.viewport(1280,1500)
    visit(f.repositoryProjectUuid,f.repositoryChapter)
    cy.get('body').then($body => { [...$body[0].querySelectorAll('.c-questionnaire-item__toggle[aria-expanded="false"]')].forEach(e => cy.wrap(e).click({scrollBehavior:false})) })
    question(f.repositoryQuestion).invoke('attr','data-presentation-question','repository')
    cy.get('[data-presentation-question="repository"]').should('contain.text','Our national repository').and('contain.text','Disadvantage')
    capture('slide-23-repository-question','[data-presentation-question="repository"]')
  })
  it('slide-25-integration-search-and-selection', () => {
    cy.viewport(1280,1000)
    visit(f.integrationProjectUuid,f.integrationChapter)
    cy.get('body').then($body => { [...$body[0].querySelectorAll('.c-questionnaire-item__toggle[aria-expanded="false"]')].forEach(e => cy.wrap(e).click({scrollBehavior:false})) })
    question(f.integrationQuestion).invoke('attr','data-presentation-question','integration')
    cy.get('[data-presentation-question="integration"]').then($q => { if (!$q.find('input[role=combobox]').length) cy.wrap($q).contains('button','Clear answer').click() })
    cy.get('[data-presentation-question="integration"] input[role="combobox"]').clear().type(f.integrationSearch)
    cy.get('[data-presentation-question="integration"] [role="option"]', {timeout:30000}).should('have.length.greaterThan',0)
    capture('slide-25-integration-search','[data-presentation-question="integration"]',0)
    cy.contains('[data-presentation-question="integration"] [role="option"]','Banana Genome Hub').click()
    cy.get('[data-presentation-question="integration"] .c-questionnaire-integration a[href*="10.25504"]', {timeout:15000}).first().invoke('attr','href').then(url => cy.task('presentation:record-url','https://fairsharing.org/' + new URL(url).pathname.replace(/^\//,'')))
    capture('slide-25-integration-selection','[data-presentation-question="integration"]',0)
  })
  it('slide-25-external-record', () => {
    cy.viewport(1280,1000)
    cy.task('presentation:record-url').then(url => {
      const target=url || scene('slide-25-external-record').url
      cy.task('presentation:record-url',target)
      cy.visit(target)
    })
    cy.contains('h1,h2,h3','Banana Genome Hub',{timeout:60000}).should('be.visible')
    cy.get('.v-overlay:not(.v-tooltip) .v-overlay__scrim:visible',{timeout:30000}).should('not.exist')
    cy.document().then(d => d.fonts.ready)
    cy.contains('h1,h2,h3','Banana Genome Hub').scrollIntoView({offset:{top:-150,left:0}})
    cy.get('.v-overlay:not(.v-tooltip) .v-overlay__content:visible',{timeout:60000}).should('not.exist')
    cy.screenshot(scene('slide-25-external-record').path,{capture:'viewport',overwrite:true,disableTimersAndAnimations:false})
    cy.task('capture:record',{path:scene('slide-25-external-record').path,crop:{x:0,y:0,width:1280,height:1000},viewport:{width:1280,height:1000}})
  })
  it('slide-26-open-comments', () => {
    cy.viewport(1280,900)
    visit(f.projectUuid,'1e85da40-bbfc-4180-903e-6c569ed2da38')
    cy.getCy('questionnaire_toolbar_comments').click()
    cy.contains('.ui-workspace__aside button','Is there any pre-existing data?').click()
    cy.get('.ui-workspace__aside .c-questionnaire-comments__comment',{timeout:15000}).should('exist')
    capture('slide-26-open-comments','.c-questionnaire-comments__head',0)
  })
})
