describe('Test du front', () => {

    it('Page /', () => {
        cy.visit('localhost:4010')
    })

    it('Page /etape_0', () => {
        cy.visit('localhost:4010/etape_0')
    })

    it('Page /avancee', () => {
        cy.visit('localhost:4010/avancee')
    })

    it('Page /equipe', () => {
        cy.visit('localhost:4010/equipe')
    })
})
