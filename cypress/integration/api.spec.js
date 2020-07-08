describe('todos API', function () {
  before(() => {
    cy.request(
      {
        method: 'POST',
        url: 'https://cryptic-sierra-47326.herokuapp.com/todos/',
        headers: {
          'content-type': 'application/json'
        },
        body: {
          "title": `${new Date().toLocaleString()} post`,
          "completed": false
        }
      }
    ).as('postResult')
  });
  describe('GET -', function () {
    it('returns JSON', () => {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    })

    it('loads items not to be null', function () {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos')
        .its('body')
        .should('not.be', null)
    })
  })

  describe('GET - a specific item', function () {
    it('returns JSON', function () {
      const { body } = this.postResult
      cy.request(`https://cryptic-sierra-47326.herokuapp.com/todos/${body._id}`)
        .its('body').as('getSpecific')
      cy.get('@getSpecific').then((response) => {
        expect(response.title).to.include('post')
        expect(response).to.have.property('completed', false)
      })
    })
  })


  describe('GET - 1 todos', function () {
    it('get two items', function () {
      cy.request('https://cryptic-sierra-47326.herokuapp.com/todos/count/1')
        .its('body')
        .should('have.length', 1)
    })
  })

  describe('POST - create a todo', function () {
    it('returns JSON', function () {
      const { body, status } = this.postResult
      expect(status).to.equal(200)
      expect(body.title).include('post')
      expect(body.completed).equal(false)
    })
  })

  describe('PATCH - update', function () {
    it('an existing todo', function () {
      const { body } = this.postResult
      cy.request(
        {
          method: 'PATCH',
          url: `https://cryptic-sierra-47326.herokuapp.com/todos/${body._id}`,
          headers: {
            'content-type': 'application/json'
          },
          body: {
            "title": 'PUT not post tired',
            "completed": false
          }
        }
      ).as('updateResult')
      cy.get('@updateResult').then((response) => {
        expect(response.status).equal(200)
      })
    })
  })


  describe('DELETE - todo', function () {
    it('an existing todo', function () {
      const { body } = this.postResult
      cy.request(
        {
          method: 'DELETE',
          url: `https://cryptic-sierra-47326.herokuapp.com/todos/${body._id}`
        }
      ).as('deleteResult')
      cy.get('@deleteResult').then((response) => {
        expect(response.status).equal(200)
      })
    })
  })

})