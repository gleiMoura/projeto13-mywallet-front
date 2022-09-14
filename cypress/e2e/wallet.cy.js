import walletFactory from "../../factories/walletFactory";

const client = walletFactory.clientRegister;

const user = {
	email: client.email,
	password: client.password
};

const userRegister = {
	name: client.name,
	email: client.email,
	password: client.password,
	secondPassword: client.password
};

beforeEach(() => {
	cy.visit('http://localhost:3000')
})

describe("Click in register button", () => {
	it('Click on register button', async () => {
		cy.contains('a', 'Não tem uma conta? Cadastre-se').click()
		cy.get('form > :nth-child(5)').click()

		cy.on('window:alert', (e) => {
			expect(e).to.contains('Preecha todos os campos!')
		})
	});

	it.only('Do register', async () => {
		cy.register(userRegister);
		cy.intercept('POST', 'https://mywallet.onrender.com/register').as('register')
		cy.wait(2000)

		cy.on('window:alert', (e) => {
			expect(e).to.contains('Usuário criado com sucesso!')
		})
	});

	it('Do login', async () => {
		cy.register(userRegister);
		cy.wait(2000);
		cy.login(user);

		cy.url()
      .should('be.equal', 'http://localhost:3000/finance')
	});
})
