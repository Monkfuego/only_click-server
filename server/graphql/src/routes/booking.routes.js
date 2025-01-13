import { Router } from "express";
import {
  cancel,
  complete,
  previousBookings,
  bookService
} from "../controllers/booking.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
router.use(authenticate);
router.route("/book").post(bookService);
router.route("/cancel").put(cancel);
router.route("/bookingHistory").get(previousBookings);
router.route("/complete").put(complete);
export default router;
