import { Router } from 'express';
import { machine } from '../controllers/Machine';
import { historique } from '../controllers/Historique';

const router = Router();

router.get('/machine/tbs', machine);
router.get('/historique/tbs/:from/:to', historique);

export default router;
