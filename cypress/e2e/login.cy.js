import walletFactory from "../../factories/walletFactory";
import users from "../../factories/usersFactory";

beforeEach(() => {
	cy.visit(walletFactory.front_url);
})

describe("Login Test", () => {
	users.forEach(user => {
		it(`Login user ${user.name}`, async () => {
			cy.register({
				name: user.name,
				email: user.email,
				password: user.password,
				secondPassword: user.password
			});
			cy.wait(3000);
			cy.login({
				email: user.email,
				password: user.password
			});
	
			cy.url()
				.should('be.equal', `${walletFactory.front_url}/finance`)
		});
	})
});