import dotenv from "dotenv";
import client from "../../factories/walletFactorie";
dotenv.config();

beforeEach(() => {
	cy.visit('http://localhost:3001')
});

describe("Login page", () => {
	it('Do login', async () => {
		cy.get('#email').type(client.name)
		cy.get('#password').type(`${client.password}`)
		cy.intercept('POST', 'https://mywallet.onrender.com/signIn').as('signin')
		cy.get('form > :nth-child(3)').click()
		cy.wait('@signin')
	})
})