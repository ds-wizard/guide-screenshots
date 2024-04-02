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

        cy.get('.Users__Edit__content').screenshot('application/profile/edit/index/form', { padding: [0, 0, 0, 330] })
    })

    it('Change password', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/password')
        cy.get('.Users__Edit__content').should('exist')

        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.Users__Edit__content').screenshot('application/profile/edit/password/form', { padding: [0, -280, 0, 330] })
    })

    it('API Keys', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/api-keys')

        cy.get('.Users__Edit__content').screenshot('application/profile/edit/api-keys/form', { padding: [0, 0, 0, 330] })
    })
})
