import { Router } from "express";
import {
  showLeaveRequests,
  showLeaveRequestsByEmployee,
  newLeaveRequest,
  acceptLeaveRequestControl,
  showLeaveRequestsById,
} from "./LeaveRequestController";
const router = Router();

router.get("/", showLeaveRequests);
router.get("/:id", showLeaveRequestsById);
router.post("/", newLeaveRequest);
router.patch("/:id", acceptLeaveRequestControl);

export default router;
