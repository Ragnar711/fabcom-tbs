import { Router } from 'express';
import { machine } from '../controllers/Machine';

const router = Router();

router.get('/machine/tbs', machine);

export default router;
