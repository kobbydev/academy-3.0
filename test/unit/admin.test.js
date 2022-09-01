/* eslint-disable no-unused-vars */
/* eslint-disable max-lines-per-function */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import { app } from '../../index';
import { Admin } from '../../app/models/Admin';
import { adminSignupObj, adminApplication, adminAssessmentObj } from '../fixtures/auth';

chai.use(chaiHttp);
let token;
let adminId;

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
        adminId = res.body.data.admin._id;
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('checks if admin already has an account ', (done) => {
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
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('logs in an admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin-login')
      .send({
        emailAddress: adminSignupObj.emailAddress,
        password: adminSignupObj.password
      })
      .end((err, res) => {
        token = res.body.data.admin.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('creates a new admin application ', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin-create-application')
      .set('token', token)
      .set('content-type', 'multipart/form-data')
      .field('link', adminApplication.link)
      .field('dateOfApplication', adminApplication.dateOfApplication)
      .field('batchId', adminApplication.batchId)
      .field('instructions', adminApplication.instructions)
      .attach('applicationFile', fs.readFileSync(`${__dirname}/Enyata.pdf`), 'unit/Enyata.pdf')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('creates a new admin assessment', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/create-assessment')
      .set('token', token)
      .send(adminAssessmentObj)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
});

describe('Admin get routes', () => {
  it('gets all admin applicantions', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin-applications')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('gets the admin info', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin/info')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('gets all applicants for the admin', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin/getApplicants')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Admin patch routes', () => {
  it('updates admin details', (done) => {
    chai
      .request(app)
      .patch('/api/v1/admin/update-details')
      .set('token', token)
      .send({ firstName: 'William' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('updates admin profile image', (done) => {
    chai
      .request(app)
      .patch('/api/v1/admin/update-image')
      .set('token', token)
      .set('content-type', 'multipart/form-data')
      .attach('profileImage', fs.readFileSync(`${__dirname}/enyata.jpg`), 'unit/enyata.jpg')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }).timeout(22000);
});
