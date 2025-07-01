describe('DSW Registry', () => {
    it('DSW Registry', () => {
        cy.visit('https://registry.ds-wizard.org/knowledge-models')
        cy.contains('Common DSW Knowledge Model').should('exist')
        cy.get('html').screenshot('more/miscellaneous/dsw-registry/dsw-registry', { padding: [0, 0, -300, 0] })
    })
})
