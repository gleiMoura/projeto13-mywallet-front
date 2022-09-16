import { faker } from "@faker-js/faker";

const name = faker.name.firstName();
const password = faker.internet.password();
const entryValue = faker.commerce.price();
const description = faker.animal.bird();

const clientLogin = {
	name, password
};

const clientRegister = {
	name: name,
	email: faker.internet.email(),
	password: password,
	password: password
}

const entry = {
	entryValue, description
}

const walletFactory = {
	clientLogin, 
	clientRegister,
	entry
}

export default walletFactory;