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
	cy.visit('/');
})

describe("Finance tests", () => {

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

	it('Do logout', async () => {
		cy.register(userRegister);
		cy.wait(3000);
		cy.login(user);

		cy.get('header > .md').click();

		cy.url()
			.should('be.equal', `/`);
	})
})
