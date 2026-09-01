describe('Settings', () => {
    beforeEach(() => {
        cy.loginAs('admin')
    })

    // System Settings
    it('OpenID', () => {
        cy.visitApp('/settings/open-id/create')

        cy.contains('.nav-link', 'Custom').click()

        cy.fillFields({
            'clientId': '4bd87155-42b9-4a7a-b48b-cf2880b0b763',
            'clientSecret': 'idpClientSecret',
            'url': 'https://idp.example.com/4bd87155-42b9-4a7a-b48b-cf2880b0b763/v2.0',
            'styleIcon': 'fas fa-key',
            'name': 'Example SSO',
            'styleBackground': '#3f58ab',
            'styleColor': '#ffffff',
        })

        cy.get('.Settings__content').screenshot('application/administration/roles/system/openid/form', { padding: [20, 30, -100, 30] })
    })

    it('Roles / List', () => {
        cy.visitApp('/settings/roles')

        cy.get('.card-list > .card').should('have.length', 3).and('be.visible')

        cy.get('.Settings__content').screenshot('application/administration/settings/system/roles/list', { padding: [0, 0, 0, 330] })
    })

    it('Roles / Detail', () => {
        cy.visitApp('/settings/roles/a7209241-302c-42b1-970e-188d9bb8a2ed')

        cy.contains('h4', 'Project Permissions').should('be.visible')

        cy.get('.Settings__content').screenshot('application/administration/settings/system/roles/detail', { padding: [0, 0, -1000, 330] })
    })

    it('Features', () => {
        cy.visitApp('/settings/features')

        cy.get('.form-check-label').should('be.visible')

        cy.get('.Settings__content').screenshot('application/administration/settings/system/features/tours', { padding: [0, 0, 0, 330] })
    })

    it('Plugins', () => {
        cy.visitApp('/settings/plugins')

        cy.get('.form-check-label').should('be.visible')

        cy.get('.Settings__content').screenshot('application/administration/settings/system/plugins/plugins', { padding: [0, 0, 0, 330] })
    })

    // User Interface Settings
    it('Custom Links', () => {
        cy.visitApp('/settings/look-and-feel')

        cy.getCy('form-group_list_add-button').contains('Add link').click()

        cy.getCy('input-icon').type('fas fa-book')
        cy.getCy('input-title').type('User Guide')
        cy.getCy('input-url').type('https://guide.ds-wizard.org')
        cy.getCy('input-url').blur()

        cy.get('.Settings__content').screenshot('application/administration/settings/user-interface/look-and-feel/custom-links', { padding: [50, 50, -60, 0] })
    })

    // Content Settings

    // Info
    it('Usage', () => {
        cy.visitApp('/settings/usage')

        cy.get('.table-usage').should('exist')

        cy.get('.Settings__content').screenshot('application/administration/settings/info/usage/usage', { padding: [0, 0, 0, 330] })
    })
})
