import { Router } from "express";
const router = Router();

import { showUsers, registerUser, authLogin, getUserById, getByUsername } from "../controllers/User.js";

router.get('/users',showUsers);

router.get('/id/:id',getUserById);

router.post('/byUsername',getByUsername);

router.post('/register',registerUser);

router.post('/auth',authLogin);

export default router;