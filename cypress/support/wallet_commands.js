Cypress.Commands.add("register", (userRegister) => {
	cy.contains('a', 'Não tem uma conta? Cadastre-se').click()
	cy.get('#name').type(userRegister.name)
	cy.get('#email').type(userRegister.email)
	cy.get('#password').type(userRegister.password)
	cy.get('#secondPassword').type(userRegister.password)
	cy.get('form > :nth-child(5)').click()
})

Cypress.Commands.add("login", (user) => {
	cy.get('#email').type(user.email)
	cy.get('#password').type(`${user.password}`)
	cy.get('form > :nth-child(3)').click()
})

Cypress.Commands.add("loginAndRegister", (user) => {
	
})