describe('todos API', () => {
  describe('GET -', () => {
    it('returns JSON', () => {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    })

    it('loads 6 items', () => {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos')
        .its('body')
        .should('have.length', 6)
    })
  })

  describe('GET - a specific item', () => {
    it('returns JSON', () => {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos/5f008f28d7c0a62270bca547')
        .its('body')
        .should('include', { "title": "Buy a new phone" })
    })
  })
})