import Express from 'express';
import healthCheck from './healthCheck';

const router = Express.Router();

router.get('/', healthCheck);

export default router;
