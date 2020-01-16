describe('Le jeu de la vie Test', function() {
    it('Test App + Algo', function() {
    cy.visit('localhost:3000')
    cy.contains('Start').click()
    cy.contains('Random').click()
    cy.contains('Start').click()
    cy.contains('Stop').click()
    cy.get('.slider').invoke('val', 50)
    cy.contains('Start').click()
    cy.contains('Stop').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.contains('Random').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('.button-div > :nth-child(4)').click()

    cy.get('.Board').click(405,350)
    cy.get('.Board').click(405,325)
    cy.get('.Board').click(419,300)
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('[style="left: 421px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 401px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 381px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('.button-div > :nth-child(4)').click()


    cy.get('.Board').click(405,350)
    cy.get('.Board').click(425,350)


    cy.get('.Board').click(445,315)
    cy.get('.Board').click(445,335)
    cy.get('.Board').click(385,315)
    cy.get('.Board').click(385,335)
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('[style="left: 381px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 441px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 401px; top: 341px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 421px; top: 341px; width: 19px; height: 19px;"]')
    cy.get('.button-div > :nth-child(3)').click()
    cy.get('[style="left: 401px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 421px; top: 321px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 401px; top: 341px; width: 19px; height: 19px;"]')
    cy.get('[style="left: 421px; top: 341px; width: 19px; height: 19px;"]')
    })
  })