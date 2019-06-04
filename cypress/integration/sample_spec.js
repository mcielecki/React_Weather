describe('Weather app global test', function() {
    it('Should perfectly works', function() {
      cy.visit('http://localhost:3000')

      cy.get('.search-input')
        .type('Kraków')
        .should('have.value', 'Kraków')

        cy.get('.start-btn').click()

        cy.get('.city-name')
        .should('contain', 'Kraków')

        cy.visit('http://localhost:3000/city/Kraków')

        cy.get('.title-text')
        .should('contain', 'Kraków')

        cy.get('.white')
        .should('contain', '°C')

        cy.get('.change-temp').click()

        cy.get('.white')
        .should('contain', '°F')

        cy.visit('http://localhost:3000')

        cy.get('.delete-all').click()
        
        cy.get('.city-name')
        .should('not.contain', 'Kraków')

        cy.get('.search-input')
        .type('Kraków')
        .should('have.value', 'Kraków')

        cy.get('.start-btn').click()

        cy.get('.city-delete').click()

        cy.get('.city-name')
        .should('not.contain', 'Kraków')
    })
  })