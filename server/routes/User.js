import { Router } from "express";
const router = Router();

import { showUsers, registerUser, authLogin } from "../controllers/User.js";

router.get('/users',showUsers);

router.post('/register',registerUser);

router.post('/auth',authLogin);

export default router;