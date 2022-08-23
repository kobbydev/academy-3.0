import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import { adminLogIn, getAllUserInfo } from '../../../controllers/Admin';
import { joiForLogin } from '../../../middlewares/validation/user';

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
export default router;
