import { Router } from "express";
import {
getAllProvider
} from "../controllers/provider.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/getProviders').get(authenticate,getAllProvider)
export default router;
