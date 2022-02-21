describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'keje',
      username: 'keje',
      password: 'keje'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  describe('Login ', function() {
    it('Login page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Log in to application')
      cy.contains('Username')
    })

    it('Login right', function() {
      cy.contains('Login').click()
      cy.get('#username').type('keje')
      cy.get('#password').type('keje')
      cy.get('#login').click()
      cy.contains('keje logged in')
      cy.get('#logout').click()
    })
    it('Login wrong', function() {
      cy.contains('Login').click()
      cy.get('#username').type('keje')
      cy.get('#password').type('kej')
      cy.get('#login').click()

      cy.contains('Wrong username or password')
    })

  })

  describe('Create blog ', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('keje')
      cy.get('#password').type('keje')
      cy.get('#login').click()
    })

    it('Create blog', function() {
      cy.contains('keje logged in')
      cy.contains('Create').click()
      cy.get('#title').type('new blog 2')
      cy.get('#author').type('keje')
      cy.get('#url').type('nb2.fi')
      cy.get('#create').click()
      cy.contains('new blog 2')
      cy.contains('Show').click()
      //cy.get('#like').click()
      //cy.contains('Likes 1')
    })
    it('Like blog', function() {
      cy.contains('Create').click()
      cy.get('#title').type('new blog 2')
      cy.get('#author').type('keje')
      cy.get('#url').type('nb2.fi')
      cy.get('#create').click()
      //cy.reload(true)
      cy.contains('new blog 2')
      cy.contains('Show').click()
      cy.get('#like').click()
      cy.contains('Likes 1')
    })
    it('Delete blog', function() {
      cy.contains('Create').click()
      cy.get('#title').type('new blog 2')
      cy.get('#author').type('keje')
      cy.get('#url').type('nb2.fi')
      cy.get('#create').click()
      //cy.reload(true)
      cy.contains('new blog 2')
      cy.contains('Show').click()
      cy.contains('Delete').click()
      //cy.reload(true)
      cy.get('new blog 2').should('not.exist')
      //cy.get('#delete').click()
    })
  })


  //it('Create blog', function() {
/*cy.contains('keje logged in')
    cy.contains('Login').click()
    cy.get('#username').type('keje')
    cy.get('#password').type('keje')
    cy.get('#login').click()
    cy.contains('Create').click()
    cy.get('#title').type('new blog 2')
    cy.get('#author').type('keje')
    cy.get('#url').type('nb2.fi')
    cy.get('#create').click()
    cy.reload(true)
    cy.contains('new blog 2')
    cy.contains('Show').click()
    cy.get('#like').click()*/
    //cy.contains('Likes 1')
  //})

  /*
  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  }) */

})