import { faker } from "@faker-js/faker";

const client = {
	name: faker.name.firstName(),
	password: faker.internet.password()
};

console.log(faker.password)

export default client;