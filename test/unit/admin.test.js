/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { app } from '../../index';
import { Admin } from '../../app/models/Admin';
import { adminSignupObj } from '../fixtures/auth';

chai.use(chaiHttp);
let token;

describe('Admin post requests', () => {
  before(async () => {
    await Admin.deleteMany({});
  });
  it('creates a new admin ', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/signup')
      .set('content-type', 'multipart/form-data')
      .field('firstName', adminSignupObj.firstName)
      .field('lastName', adminSignupObj.lastName)
      .field('emailAddress', adminSignupObj.emailAddress)
      .field('password', adminSignupObj.password)
      .field('phoneNumber', adminSignupObj.phoneNumber)
      .field('country', adminSignupObj.country)
      .field('address', adminSignupObj.address)
      .attach('profileImage', fs.readFileSync(`${__dirname}/enyata.jpg`), 'unit/enyata.jpg')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }).timeout(12000);
  it('logs in an admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin-login')
      .send({
        emailAddress: adminSignupObj.emailAddress,
        password: adminSignupObj.password
      })
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
});
