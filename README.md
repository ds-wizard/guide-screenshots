# Guide Screenshots

A repository for generating screenshots for the [DSW User Guide](https://github.com/ds-wizard/guide/tree/develop).

## Usage

### Install Requirements

Use node 18 and install all the dependencies:

```
$ make install
```

### Setup Environment

Create a new file `cypress.env.js` in the project root and fill in the URLs and user accounts of the instance used for taking screenshots, as well as some instance details to be filled.

```js
module.exports = {
    url: "...",
    apiUrl: "...",
    adminUsername: "...",
    adminPassword: "...",
    dataStewardUsername: "...",
    dataStewardPassword: "...",
    researcherUsername: "...",
    researcherPassword: "...",

    appTitle: 'DS Wizard',
    appTitleShort: 'DS Wizard',
    primaryColor: '#E95420',
    illustrationsColor: '#E95420',
    logoFixture: 'logo.svg',
}
```

Logo should be placed in `cypress/fixtures/logo` folder. If the `logoFixture` property is not set, the default logo will be used.

Create `.env` in the project root and fill in path to DSW User Guide locally:

```
GUIDE_PATH=/path/to/ds-wizard/guide
```

### Create Scenarios for Screenshots

Use Cypress to create scenarios for taking screenshots. When taking a screenshot, use the file name that corresponds to the path where the screenshot should be in the docs.

For example, this one:

```js
cy.screenshot('projects/detail/index/questionnaire')
```

 Will eventually end up in `/path/to/ds-wizard/guide/docs/projects/detail/index/questionnaire.png`.

 ### Run Cypress to Generate the Screenshots

 ```
 $ make screenshots
 ```

 ### Copy the Screenshots into the Guide

 ```
 $ make copy
 ```

 ## License

This project is licensed under the Apache License v2.0 - see the
[LICENSE](LICENSE) file for more details.
