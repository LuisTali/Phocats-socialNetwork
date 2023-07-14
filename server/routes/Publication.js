import {Router} from 'express';
import { getPublications, newPublication, getPublicationsByIdUser, getPublicationsByNameTag, getPublicationById, getPublicationsFromFollowedUsers, editPublication, deletePublication} from '../controllers/Publication.js';
import path from 'path';
import multer from 'multer';

const router = Router();

router.get('/',getPublications);

router.get('/publicationsByTag/:tag',getPublicationsByNameTag);

router.get('/:id',getPublicationById);

router.get('/feed/:id',getPublicationsFromFollowedUsers);

router.post('/add',newPublication);

router.get('/publicationsByUser/:id',getPublicationsByIdUser);

router.post('/edit',editPublication);

router.post('/delete/:id',deletePublication);

export default router;