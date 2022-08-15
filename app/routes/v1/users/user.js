import { Router } from 'express';

const router = Router();

router.get('/user', (req, res) => res.send('Hello World! I ma a new user.'));

export default router;
