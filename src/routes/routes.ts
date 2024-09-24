import { Router } from 'express';
import { machine } from '../controllers/Machine';
import { historique } from '../controllers/Historique';
import { management } from '../controllers/Management';
import { addOf } from '../controllers/OF';

const router = Router();

router.get('/machine/tbs', machine);
router.get('/historique/tbs/:from/:to', historique);
router.get('/management/tbs/:from/:to', management);

router.post('/of/tbs', addOf);

export default router;
