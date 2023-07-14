import { Router } from "express";
import multer from 'multer';
import path from 'path';
const router = Router();


import { showUsers, registerUser, authLogin, getUserById, getByUsername, followAccount, unfollowAccount, checkFollow, updateNotificatedStatus, poblateFriendsPage, editProfile, sendValidationToken, checkValidationToken } from "../controllers/User.js";


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

router.post('/edit',editProfile);

router.get('/validateToken/:id',sendValidationToken);

router.post('/checkToken',checkValidationToken);

export default router;