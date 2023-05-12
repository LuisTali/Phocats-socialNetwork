import { Router } from "express";
const router = Router();

import { showUsers } from "../controllers/User.js";

router.get('/users',showUsers);

export default router;