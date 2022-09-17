import { faker } from "@faker-js/faker";

const usersNumber = 5
const users = [];

for (let i = 0; i < usersNumber; i++) {
	const password = faker.internet.password()
	users.push(
		{
			name: faker.name.firstName(),
			email: faker.internet.email(),
			password,
			secondPassword: password
		}
	)
};

export default users;