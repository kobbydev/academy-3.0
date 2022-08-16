import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import { adminLogIn } from '../../../controllers/Admin';
import { joiForLogin } from '../../../middlewares/validation/user';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword } = AuthMiddleware;
const { roleValueValidator, adminAccessValidator } = RoleMiddleware;

router.post(
  '/admin-login',
  validate(joiForLogin),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  adminAccessValidator,
  adminLogIn
);
export default router;
