import {Router} from 'express';
const router = Router();

import { getPublications, newPublication } from '../controllers/Publication.js';

router.get('/',getPublications);
router.post('/add',newPublication);

export default router;