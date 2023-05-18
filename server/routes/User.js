import { Router } from "express";
const router = Router();

import { showUsers, registerUser, authLogin, getById } from "../controllers/User.js";

router.get('/users',showUsers);

router.get('/id/:id',getById);

router.post('/register',registerUser);

router.post('/auth',authLogin);

export default router;