# DSW guide screenshots

Cypress captures for DSW 5.0 at https://mediakit.ds-wizard.org. The existing two projects and screenshot accounts are reused. The 4.x scenarios remain as reference; their original instructions are in [docs/4.x-workflow.md](docs/4.x-workflow.md).

## Run

Use Node.js 24 and the existing npm dependencies. Keep credentials in the ignored `cypress.env.js` file. Set `GUIDE_PATH` in the ignored `.env` file to the local `dsw-guide` checkout.

- `make screenshots` runs the 5.0 scenarios. The wrapper saves project settings, temporarily selects the preview/template examples, and restores both projects even if Cypress fails. The full run then captures the staged KM migration example and cancels it automatically
- `DSW_SCENES=km-list,dt-delete make screenshots` runs selected scenes
- `node scripts/capture-km-migration.cjs` captures just the migration list, update dialog and change review, then verifies the Chemistry editor is restored
- `make copy` installs captures at their mapped guide locations and replaces only matching screenshot TODOs
- Rebuild the guide separately with its existing Sphinx environment

Captures use a 1280 × 800 viewport by default, with a taller viewport only for a long form. Forms and question examples are cropped to their content. Dialog crops keep the real grey backdrop. Lists/settings keep navigation; project-detail captures collapse it. No Playwright is used.

## Files

- `cypress/fixtures/5.0/scenes.json`: routes, readiness selectors, crops and guide pages
- `cypress/fixtures/5.0/guide-map.json`: explicit screenshot placements
- `cypress/fixtures/5.0/mediakit.json`: existing synthetic example IDs; no credentials
- `cypress/fixtures/5.0/templates` and `locales`: supplied reusable inputs
- `output/5.0/images` and `manifest.json`: generated captures and run results
- `WORKLOG.md` and `ISSUES.md`: progress, exclusions and application/content findings

Scenarios block data-changing API requests and never confirm deletion. Intentional example preparation is separate from captures. H2020 and the LS KM stay at their existing versions to show update availability. The guide capture workflow does not create additional projects. The opt-in presentation workflow below maintains its own dedicated examples.

## Presentation slides

Run `make presentation-slides` to prepare and capture the reusable synthetic presentation examples. This is an opt-in suite in `cypress/e2e/presentation-slides.cy.js`, with its scene descriptions in `cypress/fixtures/presentation-slides.json` and reusable project IDs in `cypress/fixtures/presentation-slides-mediakit.json`. The two dedicated presentation projects are retained and reset idempotently, so guide examples remain unchanged.

Images and the manifest go to `output/presentation-slides`. `make screenshots` continues to run only `cypress/e2e/5.0`; `make copy` reads only the 5.0 scene file, guide map and output folder. Presentation captures therefore cannot be installed in the user guide by that command.

Slides 27 (metrics) and 30 (KM question editing) reuse existing guide scenes, recreated with `DSW_SCENES=project-metrics,km-question make screenshots`. The presentation-specific suite above remains separate.

The captures use the current mediakit Common DSW KM 2.8.3. The supplied KM 2.7.0 was used to identify the matching repository question UUID.

The repository question is UUID `80a682bd-8a5c-4a52-935d-680509838a4e`, located in the supplied Common DSW KM 2.7.0. It selects the national repository to demonstrate metrics and tailored advice. The old “Reference database or dataset” question (`93988527-5bff-4125-8834-3750e9a28683`) was deleted in KM 2.7.0. The integration flow uses the current FAIRsharing repository question and the live Banana Genome Hub search result instead, preserving the search / selected URI / external record sequence.

## Reusing this suite

The supported target is DSW mediakit (`https://mediakit.ds-wizard.org`), not the FW mediakit instances. Fixture IDs in `cypress/fixtures/5.0/mediakit.json` belong to that instance. After rebuilding or replacing it, rediscover/update those IDs and restore the documented example content before capturing. Preparation helpers make real data changes; capture-time temporary project settings are backed up and restored by the wrapper. Migration capture starts then cancels a real editor migration.

Run `npm ci` with Node.js 24. Generated images, diagnostics, credentials and local `.env` remain ignored; approved images are maintained in the guide repository. A new environment is not automatically provisioned by running Cypress.
