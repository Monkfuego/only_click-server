import { Router } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("logout").post(authenticate, logoutUser);
router.route("/getProfile").get(authenticate, getProfile);
router.route("/update").put(authenticate, updateProfile);
export default router;
