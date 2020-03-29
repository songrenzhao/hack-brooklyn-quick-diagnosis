import Express from 'express';
import searchSymptoms from './searchSymptom';
import suggestSymptom from './suggestSymptom';
import diagnosisSymptom from './diagnosisSymptom';

const router = Express.Router();

router.post('/search', searchSymptoms);
router.post('/suggest', suggestSymptom);
router.post('/diagnosis', diagnosisSymptom);

export default router;
