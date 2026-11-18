
## 3 November 2026 — DSW 5.0 guide screenshots (in progress)

- Target: https://mediakit.ds-wizard.org, open-source DSW; no workspaces or FAIR Wizard-only features
- Preserve the existing two projects, LS KM and H2020 update indicators; reuse existing Cypress workflows and synthetic screenshot accounts
- Use Cypress and 5.0 selectors/capture conventions established in fw-screenshots; no Playwright
- Viewport below Full HD; crop forms/dialogs to content with grey backdrop margins; retain navigation for lists/settings and collapse it for project work
- Upgrade to exact staging builds after backups and required 4.35 upgrade; update attached templates except H2020; install existing Czech screenshot translations
- Track coverage and issues; copy reviewed captures into dsw-guide, replace matching TODOs and rebuild
- Historical 4.x scenarios retained for reference; adaptation/run results follow

### Deployment and first captures

- Mediakit database/config/S3 backed up before migration; official 4.34→4.35 prerequisite script completed, then 5.0 migration and workers started. Core API bootstrap returns 200; Einstein credentials work
- Imported Questionnaire Report 3.0.0, Science Europe 3.0.1, Horizon Europe 3.1.1 and maDMP 3.1.0. H2020 stays at 1.27.0 (remote 1.27.1); LS KM stays at 2.7.0 (remote 2.8.3)
- Resource Pages template removed with explicit user approval after dependents preview confirmed no affected projects/documents/editors
- Existing Czech UI/mail PO files installed and enabled; English remains default. One Research Team group and one compatible Questionnaire Report draft added; no third project
- Initial full capture: 80/87 passed; follow-up project pass brought accumulated captures to 102. Unsupported CSV user-import routes excluded (FW only); Connected Accounts unavailable without configured providers; News unavailable in current configuration. Missing-provider list uses its legitimate empty state
- Temporary project template/preview settings backed up outside version control for restoration after captures. Scenarios block application writes and never confirm deletion

### Common KM update authorized

- User approved updating Common and migrating My Experiment. Imported the official Common 2.8.3 bundle through the 5.0 bundle API after the current Registry's legacy API prevented a normal pull
- Migrated My Experiment from 2.7.0 to 2.8.3 with its existing tag selection. Named-version metadata compared equal before/after; project count remains two. LS KM and H2020 untouched
- Screenshot fixture now references the current Common UUID. Refreshing the affected guide captures against the migrated project, with automatic restoration of temporary settings afterward

### Screenshot integration and final verification

- Refreshed all 118 scenarios after the approved Common migration: 116 passed in the full run; the two document previews passed in a focused follow-up after allowing generation time. A transient network timeout required another focused attempt; the final settings restoration succeeded
- Integrated 117 unique screenshots in 118 guide placements, using native RST figures with alt text and size limits. Kept 13 missing examples as visible TODOs; exact locations are in the guide maintenance inventory
- Verified two original projects remain, both temporary project-settings snapshots match the restored state exactly, and Czech UI/mail locales are enabled without becoming default
- Strict HTML build, local link/image checks, all 38 application help targets and rendered sidebar aliases pass. Visually reviewed the sharing modal framing in the guide. No commit or push
- Remaining environment/content findings are in ISSUES.md, including the separate legacy gateway failure and the supplied report template's Workspace label in OS

### Requested screenshot refinements

- Added a populated sharing capture with Isaac Newton and Marie Curie (Researcher accounts), Nikola Tesla (Data Steward account), and Research Team. Project access is illustrated as Owner/Editor/Viewer; the unsaved sharing form does not change persisted access
- Added meaningful synthetic geology attachments, real generated HTML/PDF reports, group membership examples, default project tags, saved dashboard announcement/menu link, login information/announcement, and the requested labelled mock OpenID provider
- Marie account creation was explicitly approved after automatic review rejected the initial proposal; existing inactive Charles account retained. No real provider credential used
- Captured requested lists with their last-row menu open, cropped Language/Tours, removed redundant guide placements, and used matching settings and rendered dashboard/login views
- Focused captures pass after resolving selector and framing issues. All 118 mapped image dimensions verified. Temporary project settings restored after each run; original two-project structure preserved
- Added repeatable setup scripts/refine-mediakit-examples.cjs and reusable synthetic files under cypress/fixtures/5.0/project-files. No commit or push

### KM migration capture completion

- Existing Chemistry editor was already clean/outdated and suitable for migration screenshots. Captured editor list and update dialog, started a real migration from Common 2.4.0 to 2.8.3, and captured its actual change review
- Cancelled the temporary migration using the supported API; editor details matched the pre-capture snapshot exactly. No resolutions applied, no publication and no new content/editor/project created
- Added scripts/capture-km-migration.cjs with cleanup and restoration verification. Staged scenarios are excluded from the ordinary Cypress pass and run through that helper after a full capture run; selected ordinary scenes remain supported
- All three scenarios passed; focused change-review crop also passed the saved-image framing check. Integrated 121 unique screenshots in 123 guide placements; dismissed the other placeholders at user request
- Strict guide HTML/LaTeX-source builds and local links/app help checks pass. No visible screenshot TODOs remain; contributor Document Context work remains separate

## 2026-11-04 — Reusable presentation slides

- Added opt-in `make presentation-slides`, `cypress/e2e/presentation-slides.cy.js`, presentation scene/project fixtures, and an idempotent preparation script. Two retained synthetic presentation projects keep guide examples unchanged.
- Presentation output lives in `output/presentation-slides`; default guide specs, guide scene map and `make copy` remain restricted to their existing 5.0 sources. Verified that no presentation IDs occur in the guide-copy map.
- Captures: exact repository question with national answer, FAIRsharing banana search, selected result/URI, fully loaded external Banana Genome Hub record, and an opened comments panel. Source repository question located in supplied Common DSW KM 2.7.0; capture instance uses KM 2.8.3. The old reference-dataset integration question was deleted in 2.7.0, so its current repository counterpart is used.
- Setup reuses the saved integration path when the previous answer has been cleared. External capture waits for loading content to disappear and does not freeze transition animations.
- Verified from this repository with `make presentation-slides`: 4 scenarios passed, 5 screenshots retained, 0 failures. The external record completed on its retry. Existing working-tree changes were retained.

## 4 November 2026 — Shared screenshot hotfix

- Refreshed only the template-editor preview and API-key list. Preview uses the author's corrected report files and collapsed global navigation; obsolete Workspace row removed
- Added a visible temporary API-key example, asserted the row before capture, then revoked the key. An initial expired key could not demonstrate the UI because the page lists active keys only
- Preserved the author's fixed bundle in fixtures for future setup. No password, generated token or real secret value was saved in the fixtures or images
- Both focused final Cypress runs passed. Guide changes are on hotfix/5.0-guide-screenshots in ds-wizard/guide, PR #291 to main and #292 to develop; both left open

## PR preparation — 18 November 2026
- Publish existing 5.0 Cypress guide/presentation capture scripts, portable template/locale/file inputs and guide-copy mappings. Target remains DSW mediakit.
- Replace two developer-specific diagnostic paths with ignored output/setup paths. Document environment-bound fixture IDs and real setup/migration effects. No live setup or captures run during PR preparation.
- PR verification: all 16 staged JavaScript files pass node --check; JSON parses and guide image references resolve to scene IDs. No credentials/output staged. No fresh live capture run performed.
