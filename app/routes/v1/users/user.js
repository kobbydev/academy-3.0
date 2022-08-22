/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { joiForUser, joiForLogin, joirForApplication } from '../../../middlewares/validation/user';
import { ValidationMiddleware, AuthMiddleware, RoleMiddleware } from '../../../middlewares';
import {
  userSignUp,
  userLogIn,
  createUserApplication,
  getUserInfo
} from '../../../controllers/User';
import { checkForUser, applicationValidator } from '../../../middlewares/user';
// import multerFile from '../../../utils/multer';

const router = Router();
// eslint-disable-next-line no-unused-vars
const { validate } = ValidationMiddleware;
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator } = RoleMiddleware;

// const fileUpload = multer({ dest: 'uploads/' });
// const upload = multerFile.fields([{ name: 'image' }, { name: 'cv' }]);
// const upload = multerFile.single('image');

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
  validate(joirForApplication),
  authenticate,
  applicationValidator,
  createUserApplication
);
export default router;

// router to fetch a user's info
router.get('/userInfo', authenticate, getUserInfo);
