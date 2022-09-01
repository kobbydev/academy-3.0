import { Router } from 'express';
import { checkForAdmin } from '../../../middlewares/admin';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import {
  adminSignUp,
  adminLogIn,
  adminCreateApplication,
  createAdminAssessment,
  getAllUserInfo,
  getAllAdminApplications,
  updateAdminDetails,
  approveUser,
  getAdminInfo,
  updateTimer,
  updateAdminImage
} from '../../../controllers/Admin';
import { getSingleUser } from '../../../controllers/User';
import {
  joiForLogin,
  joiForAdminApplication,
  joiForCreateAssesment,
  joiForAdminSignup
} from '../../../middlewares/validation/user';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginAdminEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator, adminAccessValidator, adminAccess } = RoleMiddleware;

// Creates an admin
router.post('/admin/signup', validate(joiForAdminSignup), checkForAdmin, adminSignUp);

// logins in an admin
router.post(
  '/admin-login',
  validate(joiForLogin),
  loginAdminEmailValidator,
  comparePassword,
  roleValueValidator,
  adminAccessValidator,
  adminLogIn
);

router.post(
  '/admin-create-application',
  validate(joiForAdminApplication),
  authenticate,
  adminAccess,
  adminCreateApplication
);

// Router to create an assessment
router.post(
  '/admin/create-assessment',
  validate(joiForCreateAssesment),
  authenticate,
  adminAccess,
  createAdminAssessment
);

// Router to get admin applications
router.get('/admin-applications', authenticate, adminAccess, getAllAdminApplications);

// Router to get admin info
router.get('/admin/info', authenticate, adminAccess, getAdminInfo);

// router to get applicant info
router.get('/applicant-info/:id', authenticate, getSingleUser);

// Fetches all the applicants for the admin
router.get('/admin/getApplicants', authenticate, adminAccess, getAllUserInfo);

// Ruoter to update the details of an Admin
router.patch('/admin/update-details', authenticate, adminAccess, updateAdminDetails);

// Ruoter to update the details of an Admin
router.patch('/admin/update-image', authenticate, adminAccess, updateAdminImage);

// Router to approve an application
router.patch('/admin/approve-application/:id', authenticate, approveUser);

router.put('/admin/update-timer', authenticate, adminAccess, updateTimer);

export default router;
