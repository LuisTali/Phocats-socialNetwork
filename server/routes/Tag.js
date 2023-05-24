import { Router } from "express";
const router = Router();

import { getTop3MostUsedTags } from "../controllers/Tag.js";

router.get('/top3',getTop3MostUsedTags);

export default router;