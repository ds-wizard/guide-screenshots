// Adapted from codevence/fair-wizard-e2e-tests, wizard-5.0, pinned in source-revisions.json.
// Reuse the selector and session contract; replace DB workspace lookup with explicit config.
const { clipFor, unionRect } = require('./crop')
const capture = Cypress.expose('capture')
let session
// Keep global navigation on lists; give detail and editing views their full width.
function sidebarCollapsedFor(path) {
  const page = new URL(path, capture.baseUrl).pathname.replace(/^\/w\/[^/]+/, '')
  const uuid = '[0-9a-f-]{36}'
  if (new RegExp('^/projects/'+uuid+'(?:/|$)', 'i').test(page)) return !/\/(?:documents|files)\/?$/.test(page)
  return new RegExp('^/(?:knowledge-models|document-templates)/(?:editors/)?'+uuid+'(?:/|$)', 'i').test(page)
    || page === '/knowledge-models/compare'
    || new RegExp('^/knowledge-models/data-sources/'+uuid+'(?:/|$)', 'i').test(page)
    || new RegExp('^/user-groups/'+uuid+'/?$', 'i').test(page)
    || new RegExp('^/analytics/(?:projects|knowledge-models|document-templates|users|user-groups)/'+uuid+'(?:/|$)', 'i').test(page)
}
function measuredRegion(el, through) {
  const ends = through ? [...el.ownerDocument.querySelectorAll(through)] : []
  if (through && !ends.length) throw new Error(`Missing end of capture range: ${through}`)
  return ends.reduce((rect, end) => unionRect(rect, end.getBoundingClientRect()), el.getBoundingClientRect())
}

Cypress.Commands.add('getCy', testId => cy.get(`[data-cy="${testId}"]`))
Cypress.Commands.add('getField', path => {
  const sanitized = path.split('').map(c => /[a-zA-Z0-9_-]/.test(c) ? c : '-').join('').split('-').filter(Boolean).join('-')
  return cy.get(`#form-${sanitized}`)
})
Cypress.Commands.add('loginAs', () => cy.task('capture:login', null, { log: false }).then(token => { session = token }))
Cypress.Commands.add('visitTenant', path => cy.visit(path, {
  onBeforeLoad(win) {
    win.localStorage.setItem('ui-mode', capture.theme)
    win.localStorage.setItem('session', JSON.stringify({
      token: session, sidebarCollapsed: sidebarCollapsedFor(path), rightPanelCollapsed: true,
      fullscreen: false, apiUrl: capture.apiUrl
    }))
    Object.defineProperty(win.navigator, 'language', { value: 'en' })
  }
}))
// Same listing trigger contract as fw-e2e-tests; no action is selected.
Cypress.Commands.add('openListingItemActions', id => cy.get(`#listing-item-actions-${id}-trigger`).click({ scrollBehavior: false }))
Cypress.Commands.add('visitWorkspace', path => cy.visitTenant(path))
Cypress.Commands.add('captureRegion', (scene, selector, options = {}) => {
  // Inspect rendered text, not only one loader class or the text of closed dialogs.
  cy.get('body', { log: false }).should($body => {
    const pending = [...$body[0].querySelectorAll('*')].filter(el => {
      if (!/^Loading(?:\.{3}|…)$/.test(el.textContent?.trim() || '') || el.closest('dialog:not([open])')) return false
      const rect = el.getBoundingClientRect()
      const style = el.ownerDocument.defaultView.getComputedStyle(el)
      // Count a loader during fade-in too; ignore closed and screen-reader-only content.
      return rect.width > 2 && rect.height > 2 && style.display !== 'none' && style.visibility !== 'hidden'
    })
    expect(pending, 'no visible loading placeholder').to.have.length(0)
  })

  cy.document().then(doc => {
    // Remove the pointer's transient focus ring for a static guide image, without CSS changes.
    if (!options.keepFocus) doc.activeElement?.blur()
    return doc.fonts.ready
  })
  cy.get(selector).should('have.length', 1).then($el => {
    const el = $el[0]
    el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })
    if (options.through) {
      const rect = measuredRegion(el, options.through)
      let parent = el.parentElement
      while (parent && !(parent.scrollHeight > parent.clientHeight && /auto|scroll/.test(el.ownerDocument.defaultView.getComputedStyle(parent).overflowY))) parent = parent.parentElement
      if (parent) parent.scrollTop += rect.y + rect.height / 2 - (parent.getBoundingClientRect().top + parent.clientHeight / 2)
    }
  })
  cy.get(selector).filter(':visible').should($el => {
    const el = $el[0]
    expect(el.scrollWidth, 'target content is not horizontally cut off').to.be.at.most(el.clientWidth + 1)
    // A header can overflow into the explicitly measured range below it.
    if (!options.through) expect(el.scrollHeight, 'target content is not internally cut off').to.be.at.most(el.clientHeight + 1)
    const rect = measuredRegion(el, options.through)
    const view = el.ownerDocument.defaultView
    clipFor({ x: rect.x, y: rect.y, width: rect.width, height: rect.height }, { width: view.innerWidth, height: view.innerHeight }, options.padding ?? 10)
  }).then($el => {
    const rect = measuredRegion($el[0], options.through)
    const view = $el[0].ownerDocument.defaultView
    const crop = clipFor({ x: rect.x, y: rect.y, width: rect.width, height: rect.height }, { width: view.innerWidth, height: view.innerHeight }, options.padding ?? 10)
    cy.screenshot(scene.path, { capture: 'viewport', clip: crop, overwrite: true, disableTimersAndAnimations: true })
    cy.task('capture:record', { path: scene.path, crop, viewport: { width: view.innerWidth, height: view.innerHeight } }, { log: false })
  })
})
// This suite must never save application settings or confirm a destructive action.
// Recordings/debug screenshots are disabled; example content must be approved synthetic data.
