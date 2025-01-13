import { Router } from "express";
import {
getAllServices,
getCategoryService
} from "../controllers/service.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();

router.route('/getServices').get(authenticate,getAllServices)
router.route('/categoryService/:category').get(authenticate,getCategoryService)
export default router;
