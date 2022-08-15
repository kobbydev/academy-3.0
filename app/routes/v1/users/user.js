import { Router } from 'express';
import { joiForUser } from '../../../middlewares/validation/user';
import ValidationMiddleware from '../../../middlewares/validation';
import { userSignUp } from '../../../controllers/User';
import { checkForUser } from '../../../middlewares/user';

const router = Router();
const { validate } = ValidationMiddleware;

router.post('/user-signup', validate(joiForUser), checkForUser, userSignUp);

export default router;
