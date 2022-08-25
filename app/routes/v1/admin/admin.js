import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import {
  adminLogIn,
  getAllUserInfo,
  adminCreateApplication,
  getAllAdminApplications
} from '../../../controllers/Admin';
import { joiForLogin, joiForAdminApplication } from '../../../middlewares/validation/user';

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

// Fetches all the applicants for the admin
router.get('/admin/getApplicants', authenticate, adminAccess, getAllUserInfo);

router.post(
  '/admin-create-application',
  validate(joiForAdminApplication),
  authenticate,
  adminAccess,
  adminCreateApplication
);

router.get('/admin-applications', authenticate, adminAccess, getAllAdminApplications);

export default router;
