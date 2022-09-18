import users from "../../factories/usersFactory";
import walletFactory from "../../factories/walletFactory"


beforeEach(() => {
	cy.visit('/')
})

describe("Register tests", () => {
	it('Click on register button', async () => {
		cy.contains('a', 'Não tem uma conta? Cadastre-se').click()
		cy.get('form > :nth-child(5)').click()
	
		cy.on('window:alert', (e) => {
			expect(e).to.contains('Preecha todos os campos!')
		})
	});
	
	users.forEach(user => {
		it.only(`Register user ${user.name}`, async () => {
			cy.register(user);
			cy.intercept('POST', 'https://mywallet.onrender.com/register')
			cy.wait(3000)
	
			cy.on('window:alert', (e) => {
				expect(e).to.contains('Usuário criado com sucesso!')
			})
		});
	});
});