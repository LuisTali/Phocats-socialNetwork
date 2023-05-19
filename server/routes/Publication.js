import {Router} from 'express';
import { getPublications, newPublication, getPublicationsByIdUser} from '../controllers/Publication.js';
import path from 'path';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./server/image'));
    },
    filename: (req, file, cb) => {
        req.encryptedName = Date.now()+'-'+file.originalname; //En Middleware puedo modificar Res y Req, por lo tanto agrego como parametro el nombre del archivo ya encriptado para luego guardarlo asi en SQL Server
        cb(null, Date.now()+'-'+file.originalname);
    }
});

export const upload = multer({storage:storage});

router.get('/',getPublications);
router.post('/add',upload.single('img'),newPublication);
router.get('/publicationsByUser/:id',getPublicationsByIdUser);

export default router;