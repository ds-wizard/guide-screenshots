include .env

CYPRESS=./node_modules/.bin/cypress
SCREENSHOTS_DIR=$(PWD)/output/screenshots
DOCS_DIR=$(GUIDE_PATH)/docs

.PHONY: install
install:
	@npm install

.PHONY: screenshots
screenshots:
	@node scripts/run-captures.cjs

.PHONY:screenshots.spec
screenshots.spec:
	@node scripts/run-captures.cjs

.PHONY: copy
copy:
	@node scripts/copy-5-screenshots.cjs "$(DOCS_DIR)"

.PHONY: open
open:
	@$(CYPRESS) open --browser chrome --e2e

# Presentation captures have their own fixtures/output and are never copied to the guide.
.PHONY: presentation-slides
presentation-slides:
	@node scripts/prepare-presentation-slides.cjs
	@DSW_CAPTURE_SET=presentation-slides node node_modules/cypress/bin/cypress run --browser chrome
