"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AttendanceController_1 = require("./AttendanceController");
const router = (0, express_1.Router)();
router.get("/", AttendanceController_1.showAttandance);
router.post("/", AttendanceController_1.logAttandance);
router.patch("/", AttendanceController_1.logClockOut);
exports.default = router;
