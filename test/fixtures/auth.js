import faker from 'faker';

export const fakeLoginObj = {
  email: 'admin01@iverified.com',
  password: 'admin1234'
};

export const invalidLoginObj = {
  email: 'admin01@iverified.com',
  password: 'admin0'
};

export const rightLoginObj = {

  email: 'admin01@iverified.com',
  password: 'admin12345'

};

export const invalidAdminEmail = {
  email: faker.internet.email()
};

export const wrongEmail = {
  email: 'admin@iverified.com',
  password: 'admin1234'
};
