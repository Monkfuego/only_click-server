import { Router } from "express";
import {
getAllServices
} from "../controllers/service.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/getServices').get(authenticate,getAllServices)
export default router;
