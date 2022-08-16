import { Router } from 'express';
import { joiForUser, joiForLogin } from '../../../middlewares/validation/user';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import { userSignUp, userLogIn } from '../../../controllers/User';
import { checkForUser } from '../../../middlewares/user';
// import { AuthHelper } from '../../../utils/helpers';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword } = AuthMiddleware;
const { roleValueValidator } = RoleMiddleware;

router.post('/user-signup', validate(joiForUser), checkForUser, userSignUp);
router.post(
  '/user-login',
  validate(joiForLogin),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  userLogIn
);

export default router;
