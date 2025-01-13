import { Router } from "express";
import {
  cancel,
  complete,
  previousBookings,
} from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();
router.use(authenticate);
router.route("/book").post(bookService);
router.route("/cancel").put(cancel);
router.route("/bookingHistory").get(previousBookings);
router.route("/complete").put(complete);
export default router;
