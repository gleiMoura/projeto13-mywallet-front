import dotenv from "dotenv";
import client from "../../factories/walletFactorie";
dotenv.config();

describe("Login page", () => {
	it('Do login', async () => {
		cy.visit('http://localhost:3001')
		cy.get('#email').type(client.name)
		cy.get('#password').type(client.password)
		cy.get('form > :nth-child(3)').click()
	})
})