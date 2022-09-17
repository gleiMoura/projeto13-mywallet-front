import walletFactory from "../../factories/walletFactory";

const client = walletFactory.clientRegister;

const { entry } = walletFactory;

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

	it('Do register', async () => {
		cy.register(userRegister);
		cy.intercept('POST', 'https://mywallet.onrender.com/register').as('register')
		cy.wait(3000)

		cy.on('window:alert', (e) => {
			expect(e).to.contains('Usuário criado com sucesso!')
		})
	});

	it('Do login', async () => {
		cy.register(userRegister);
		cy.wait(3000);
		cy.login(user);

		cy.url()
      .should('be.equal', 'http://localhost:3000/finance')
	});

	it('Add an entry', async () => {
		cy.register(userRegister);
		cy.wait(3000);
		cy.login(user);

		cy.get('footer > :nth-child(1)').click();
		cy.get('#entry-number').type(entry.entryValue);
		cy.get('#entry-description').type(entry.description);
		cy.get('div.entry > form > :nth-child(3)').click();

		cy.contains(entry.entryValue).should('be.visible');
		cy.contains(entry.description).should('be.visible');
	});

	it('withdraw a value', async () => {
		cy.register(userRegister);
		cy.wait(3000);
		cy.login(user);

		cy.get('footer > :nth-child(2)').click();
		cy.get('#number').type(entry.entryValue);
		cy.get('#description').type(entry.description);
		cy.get('.exit > form > button').click();

		cy.contains(entry.entryValue).should('be.visible');
		cy.contains(entry.description).should('be.visible');
	});

	it.only('Do logout', async () => {
		cy.register(userRegister);
		cy.wait(3000);
		cy.login(user);

		cy.get('header > .md').click();

		cy.url()
			.should('be.equal', 'http://localhost:3000/')
	})
})
