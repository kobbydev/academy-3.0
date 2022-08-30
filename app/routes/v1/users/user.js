import { Router } from 'express';
import { joiForUser, joiForLogin, joiForApplication } from '../../../middlewares/validation/user';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import {
  userSignUp,
  userLogIn,
  createUserApplication,
  getUserInfo,
  getSingleUser
} from '../../../controllers/User';
import { checkForUser, applicationValidator } from '../../../middlewares/user';

const router = Router();
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator } = RoleMiddleware;

// router for user signup
router.post('/user-signup', validate(joiForUser), checkForUser, userSignUp);

// router for user login
router.post(
  '/user-login',
  validate(joiForLogin),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  userLogIn
);

// router for user to create an application
router.post(
  '/application',
  validate(joiForApplication),
  authenticate,
  applicationValidator,
  createUserApplication
);

// router to fetch a user's info
router.get('/userInfo', authenticate, getUserInfo);

router.get('/applicant-info/:id', authenticate, getSingleUser);

export default router;
