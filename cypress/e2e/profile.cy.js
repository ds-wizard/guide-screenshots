describe('Profile', () => {
    it('Menu', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')

        cy.get('#menu_profile').trigger('mouseenter')
        cy.get('.profile-submenu').should('be.visible')

        cy.get('.profile-submenu').screenshot('application/profile/index/menu', { padding: [10, -50, 10, 240] })
    })

    it('Change language', () => {
        cy.loginAs('admin')
        cy.visitApp('/locales')

        cy.get('#menu_profile').trigger('mouseenter')
        cy.get('.profile-submenu').should('be.visible')
        cy.getCy('menu_languages').click()
        cy.get('.description').contains('Czech locale for Wizard').should('be.visible').click()

        cy.get('.Users__Edit__content').screenshot('application/profile/language/list', { padding: [0, 0, 0, 330] })
    })

    it('Edit profile', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current')
        cy.get('#email').should('be.visible')

        cy.get('.Users__Edit__content').screenshot('application/profile/settings/index/form', { padding: [0, 0, 0, 330] })
    })

    it('Assigned comments', () => {
        cy.loginAs('researcher')
        cy.visitApp('/comments?resolved=false')
        cy.getCy('listing_item').should('be.visible')

        cy.screenshot('application/profile/assigned-comments/list')
    })

    it('Change password', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/password')
        cy.get('.Users__Edit__content').should('exist')

        cy.get('#password').type('somepassword')
        cy.get('#passwordConfirmation').type('somepassword')
        cy.get('#passwordConfirmation').blur()

        cy.get('.Users__Edit__content').screenshot('application/profile/settings/password/form', { padding: [0, -280, 0, 330] })
    })

    it('Tours', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/tours')
        cy.get('.Users__Edit__content').should('be.visible')

        cy.get('.Users__Edit__content').screenshot('application/profile/settings/tours/reset', { padding: [0, 0, 0, 330] })
    })

    it('API Keys', () => {
        cy.loginAs('admin')
        cy.visitApp('/users/edit/current/api-keys')
        cy.getCy('flash_alert-info').should('be.visible')

        cy.get('.Users__Edit__content').screenshot('application/profile/settings/api-keys/form', { padding: [0, 0, 0, 330] })
    })

    it('About', () =>{
        cy.loginAs('admin')
        cy.visitApp('/dashboard')

        cy.get('#menu_profile').trigger('mouseenter')
        cy.get('.profile-submenu').should('be.visible')
        cy.getCy('menu_about').click()
        cy.get('.table-build-info').should('have.length', 6)
        cy.get('.modal-cover.visible').invoke('attr', 'style', 'background: #fff')

        cy.getCy('modal_about').screenshot('application/profile/about/modal', { padding: [5, 5, 5, 5] })
    })
})
