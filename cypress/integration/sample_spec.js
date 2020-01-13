describe('My First Test', function() {
    it('Le jeu de la vie', function() {
    cy.visit('localhost:3000')
    cy.contains('Start').click()
    cy.contains('Random').click()
    cy.contains('Start').click()
    cy.contains('Stop').click()
    cy.get('.slider').invoke('val', 0).trigger('change')
    cy.contains('Start').click()
    cy.contains('Stop').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.contains('Random').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('.button-div > :nth-child(3)').click()

    })
  })