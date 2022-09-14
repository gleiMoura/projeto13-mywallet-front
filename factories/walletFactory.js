import { faker } from "@faker-js/faker";

const name = faker.name.firstName();
const password = faker.internet.password();

const clientLogin = {
	name, password
};


const clientRegister = {
	name: name,
	email: faker.internet.email(),
	password: password,
	password: password
}

const walletFactory = {
	clientLogin, 
	clientRegister
}

export default walletFactory;