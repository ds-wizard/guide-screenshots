describe('Settings', () => {
    it('OpenID', () => {
        cy.loginAs('admin')
        cy.visitApp('/settings/authentication')

        cy.get('.btn').contains('Add').click()

        cy.fillFields({
            'services\\.0\\.id': 'institutional-idp',
            'services\\.0\\.clientId': '4bd87155-42b9-4a7a-b48b-cf2880b0b763',
            'services\\.0\\.clientSecret': 'idpClientSecret',
            'services\\.0\\.url': 'https://idp.example.com/4bd87155-42b9-4a7a-b48b-cf2880b0b763/v2.0',
            'services\\.0\\.styleIcon': 'fas fa-key',
            'services\\.0\\.name': 'Example SSO',
            'services\\.0\\.styleBackground': '#3f58ab',
            'services\\.0\\.styleColor': '#ffffff',
        })

        cy.get('.col-full').screenshot('application/administration/settings/system/authentication/openid', { padding: [50, -20, -60, 0] })
    })

    it('Custom Links', () => {
        cy.loginAs('admin')
        cy.visitApp('/settings/look-and-feel')

        cy.get('.btn').contains('Add').click()

        cy.getCy('input-icon').type('fas fa-book')
        cy.getCy('input-title').type('User Guide')
        cy.getCy('input-url').type('https://guide.ds-wizard.org')
        cy.getCy('input-url').blur()

        cy.get('.col-full').screenshot('application/administration/settings/user-interface/look-and-feel/custom-links', { padding: [50, -20, -60, 0] })
    })

    it('Usage', () => {
        cy.loginAs('admin')
        cy.visitApp('/settings/usage')

        cy.get('.table-usage').should('exist')

        cy.get('.col-full').screenshot('application/administration/settings/info/usage/usage', { padding: [50, -20, -350, 0] })
    })
})
