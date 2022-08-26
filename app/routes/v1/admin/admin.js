import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import {
  adminLogIn,
  adminCreateApplication,
  createAdminAssessment,
  getAllUserInfo,
  getAllAdminApplications
} from '../../../controllers/Admin';
import {
  joiForLogin,
  joiForAdminApplication,
  joiForCreateAssesment
} from '../../../middlewares/validation/user';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator, adminAccessValidator, adminAccess } = RoleMiddleware;

// logins in an admin
router.post(
  '/admin-login',
  validate(joiForLogin),
  loginEmailValidator,
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

// Fetches all the applicants for the admin
router.get('/admin/getApplicants', authenticate, adminAccess, getAllUserInfo);

export default router;
