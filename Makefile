include .env

CYPRESS=./node_modules/.bin/cypress
SCREENSHOTS_DIR=$(PWD)/output/screenshots
DOCS_DIR=$(GUIDE_PATH)/docs

.PHONY: install
install:
	@npm install


.PHONY: screenshots
screenshots:
	@rm -rf output && $(CYPRESS) run --browser chrome


.PHONY: screenshots.spec
screenshots.spec:
	@rm -rf output && $(CYPRESS) run --browser chrome --spec=$(spec)


.PHONY: screenshots.active-sessions
screenshots.active-sessions:
	@rm -rf output && $(CYPRESS) run --browser chrome --spec=cypress/e2e/active-sessions.cy.js


.PHONY: copy
copy:
	@node scripts/copy-screenshots "$(DOCS_DIR)" "$(SCREENSHOTS_DIR)"


.PHONY: dev.open
dev.open:
	@$(CYPRESS) open --browser chrome --e2e
