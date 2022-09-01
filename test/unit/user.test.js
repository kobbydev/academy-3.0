/* eslint-disable max-lines-per-function */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { app } from '../../index';
import { User } from '../../app/models/User';
import { signUpObj, applicationObj } from '../fixtures/user';

chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
let token;

describe('User post requests', () => {
  before(async () => {
    await User.deleteMany({});
  });
  it('creates a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/user-signup')
      .send(signUpObj)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }).timeout(12000);
  it('logs in a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/user-login')
      .send({
        emailAddress: signUpObj.emailAddress,
        password: signUpObj.password
      })
      .end((err, res) => {
        token = res.body.data.user.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('creates a user application ', (done) => {
    chai
      .request(app)
      .post('/api/v1/application')
      .set('token', token)
      .set('content-type', 'multipart/form-data')
      .field('firstName', applicationObj.firstName)
      .field('lastName', applicationObj.lastName)
      .field('emailAddress', applicationObj.emailAddress)
      .field('dateOfBirth', applicationObj.dateOfBirth)
      .field('address', applicationObj.address)
      .field('university', applicationObj.university)
      .field('courseOfStudy', applicationObj.courseOfStudy)
      .field('cgpa', applicationObj.cgpa)
      .attach('image', fs.readFileSync(`${__dirname}/enyata.jpg`), 'unit/enyata.jpg')
      .attach('cv', fs.readFileSync(`${__dirname}/Enyata.pdf`), 'unit/Enyata.pdf')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }).timeout(12000);
});

describe('User get requests', () => {
  it('fetches the data of a user', (done) => {
    chai
      .request(app)
      .get('/api/v1/userInfo')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  }).timeout(12000);
  it('fetches assessment questions', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/assessment-questions')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  }).timeout(12000);
});
