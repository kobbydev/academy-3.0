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
// eslint-disable-next-line no-unused-vars
let userId;

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
        userId = res.body.data.user._id;
        expect(res.status).to.equal(201);
        done();
      });
  });
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
      // .set('token', token)
      .set({ Authorization: `Bearer ${token}` })
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
  });
  it('creates a user application and check for error ', (done) => {
    chai
      .request(app)
      .post('/api/v1/application')
      .set('token', token)
      // .set('content-type', 'multipart/form-data')
      .send({
        firstName: 'Torgbui',
        lastName: applicationObj.lastName,
        emailAddress: applicationObj.emailAddress,
        dateOfBirth: applicationObj.dateOfBirth,
        address: applicationObj.address,
        university: applicationObj.university,
        courseOfStudy: applicationObj.courseOfStudy,
        cgpa: applicationObj.cgpa,
        image: fs.readFileSync(`${__dirname}/enyata.jpg`)
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
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
  });
  it('fetches assessment questions', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/assessment-questions')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('fetches the info of an applicant', (done) => {
    chai
      .request(app)
      .get(`/api/v1/applicant-info/${userId}`)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('put requests', () => {
  it('updates the details of a user', (done) => {
    chai
      .request(app)
      .put(`/api/v1/user/update/${userId}`)
      .set('token', token)
      .send({ is_taken_test: true })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('patch requests', () => {
  it('updates the details of a user', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/admin/approve-application/${userId}`)
      .set('token', token)
      .send({ app_status: 'Approved' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
