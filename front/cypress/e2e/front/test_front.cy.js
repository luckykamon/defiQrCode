describe('Test du front', () => {
    const FRONT_URL = Cypress.env('FRONT_URL')
    it('Page /', () => {
        cy.visit(FRONT_URL + '/')
    })

    it('Page /etape_0', () => {
        cy.visit(FRONT_URL +'/etape_0_2022')
    })

    it('Page /avancee', () => {
        cy.visit(FRONT_URL +'/avancee')
    })

    it('Page /equipe', () => {
        cy.visit(FRONT_URL +'/equipe')
    })

})
