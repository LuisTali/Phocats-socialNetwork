import { Router } from "express";
import multer from 'multer';
import path from 'path';
const router = Router();


import { showUsers, registerUser, authLogin, getUserById, getByUsername, followAccount, unfollowAccount, checkFollow, updateNotificatedStatus, poblateFriendsPage, editProfile } from "../controllers/User.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./server/image/profilePictures'));
    },
    filename: (req, file, cb) => {
        req.encryptedName = Date.now()+'-'+file.originalname; //En Middleware puedo modificar Res y Req, por lo tanto agrego como parametro el nombre del archivo ya encriptado para luego guardarlo asi en SQL Server
        cb(null, Date.now()+'-'+file.originalname);
    }
 });
 
 const upload = multer({
    storage: storage
 });

router.get('/users',showUsers);

router.get('/id/:id',getUserById);

router.get('/friends/:id',poblateFriendsPage);

router.post('/byUsername',getByUsername);

router.post('/register',registerUser);

router.post('/follow',followAccount);

router.post('/unfollow',unfollowAccount);

router.post('/checkFollow',checkFollow);    

router.post('/updateNotificated',updateNotificatedStatus);

router.post('/auth',authLogin);

router.post('/edit',upload.single('profileImg'),editProfile);
//Arriba Ruta para actualizar info y foto, Abajo Ruta para actualizar info.
router.post('/editNoPhoto',editProfile);

export default router;