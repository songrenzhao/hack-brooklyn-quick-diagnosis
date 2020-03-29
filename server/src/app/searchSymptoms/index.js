import Express from 'express';
import searchSymptoms from './searchSymptom';

const router = Express.Router();

router.post('/', searchSymptoms);

export default router;
