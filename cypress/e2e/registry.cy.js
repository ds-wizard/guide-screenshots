describe('DSW Registry', () => {
    it('DSW Registry', () => {
        cy.visit('https://registry.ds-wizard.org')
        cy.contains('Common DSW Knowledge Model').should('exist')
        cy.get('html').screenshot('more/miscellaneous/dsw-registry/dsw-registry')
    })
})
