describe('Profile', () => {
    it('Menu', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')

        cy.wait(1000)

        cy.get('#menu_profile').trigger('mouseenter')
        cy.get('.profile-submenu').should('be.visible')

        cy.get('.profile-submenu').screenshot('application/profile/index/menu', { padding: [10, -50, 10, 240] })
    })

    it('Change language', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')

        cy.wait(1000)

        cy.get('#menu_profile').trigger('mouseenter')
        cy.get('.profile-submenu').should('be.visible')
        cy.getCy('menu_languages').click()
        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')

        cy.getCy('modal_languages').screenshot('application/profile/language/modal', { padding: [10, 10, 10, 10] })
    })

    it('Edit profile', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current')
        cy.get('.col-full').should('exist')

        cy.get('.col-full').screenshot('application/profile/edit/index/form', { padding: [0, 0, -230, 0] })
    })

    it('Change password', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current')
        cy.get('.col-wide-detail').should('exist')
        cy.get('.nav-link').contains('Password').click()
        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.col-full').screenshot('application/profile/edit/password/form', { padding: [0, -150, -550, 0] })
    })

    it('Api Keys', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current')
        cy.get('.col-wide-detail').should('exist')
        cy.get('.nav-link').contains('API Keys').click()

        cy.get('.col-wide-detail').screenshot('application/profile/edit/api-keys/form', { padding: [50, 240, 10, 330] })
    })

    it.only('Active Sessions', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current')
        cy.get('.col-wide-detail').should('exist')
        cy.get('.nav-link').contains('Active Sessions').click()

        cy.get('.col-wide-detail').screenshot('application/profile/edit/active-sessions/form', { padding: [50, 240, 10, 330] })
    })
})
