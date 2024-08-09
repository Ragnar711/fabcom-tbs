import { Router } from 'express';
import { signin, signup, signout } from '../controllers/User';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/signout', signout);

export default router;
