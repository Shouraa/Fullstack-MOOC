describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Mock User 1',
      username: 'firstMocker',
      password: '1234',
    });
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Mock User 2',
      username: 'secondMocker',
      password: '5678',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login');
  });

  describe('Logging in', function () {
    it('logs in with valid credentials', function () {
      cy.get('#username').type('firstMocker');
      cy.get('#password').type('1234');
      cy.get('#login-button').click();

      cy.contains('firstMocker is logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('secondMocker');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error').should('contain', 'Wrong credentials');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'firstMocker', password: '1234' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('Mock Title');
      cy.get('#author').type('Mock Author');
      cy.get('#url').type('Mock Url');
      cy.get('#create-button').click();
      cy.get('#blog-list').contains('Mock Title');
    });

    describe('when a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'myBlog',
          author: 'Mock User 1',
          url: 'www.myblog.com',
          likes: 0,
        });
      });

      it('can be liked', function () {
        cy.get('#toggleInfo-button').click();
        cy.get('#like-button').click();
        cy.contains('likes: 1');
      });

      describe('remove a blog', function () {
        it('can be removed by its creator', () => {
          cy.get('#toggleInfo-button').click();
          cy.get('#remove-button').click();
          cy.get('#blog-list').should('not.contain', 'myBlog');
        });

        it('cannot be removed by other users', function () {
          cy.login({ username: 'secondMocker', password: '5678' });
          cy.visit('http://localhost:3000');
          cy.get('#toggleInfo-button').click();
          cy.get('#remove-button').should('have.css', 'display', 'none');
        });
      });
    });
  });
});
