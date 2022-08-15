import { Router } from 'express';
import { joiForUser, joiForLogin } from '../../../middlewares/validation/user';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import { userSignUp, userLogIn } from '../../../controllers/User';
import { checkForUser } from '../../../middlewares/user';
import { AuthHelper } from '../../../utils/helpers';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword, createToken, authenticate } = AuthMiddleware;
const { roleValueValidator } = RoleMiddleware;
const { generateToken } = AuthHelper;

router.post('/user-signup', validate(joiForUser), checkForUser, userSignUp);
router.post(
  '/user-login',
  validate(joiForLogin),
  loginEmailValidator,
  comparePassword,
  // generateToken,
  userLogIn
);

export default router;
