"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptLeaveRequestControl = exports.newLeaveRequest = exports.showLeaveRequestsById = exports.showLeaveRequestsByEmployee = exports.showLeaveRequests = void 0;
const LeaveRequestService_1 = require("./LeaveRequestService");
const showLeaveRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, LeaveRequestService_1.getLeaveRequests)();
        res.send({
            status: "success",
            data: employees,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showLeaveRequests = showLeaveRequests;
const showLeaveRequestsByEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const employees = yield (0, LeaveRequestService_1.getLeaveRequestsByEmployeeId)(id);
        res.send({
            status: "success",
            data: employees,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showLeaveRequestsByEmployee = showLeaveRequestsByEmployee;
const showLeaveRequestsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const employees = yield (0, LeaveRequestService_1.getLeaveRequestsByRequestId)(id);
        res.send({
            status: "success",
            data: employees,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showLeaveRequestsById = showLeaveRequestsById;
const newLeaveRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = parseInt(req.params.id)
        const { employeeId, type, startDate, endDate } = req.body;
        const newEmployeeData = yield (0, LeaveRequestService_1.createLeaveRequest)(employeeId, type, startDate, endDate);
        res.send({
            status: "success",
            message: "leave request sent",
            data: newEmployeeData,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.newLeaveRequest = newLeaveRequest;
const acceptLeaveRequestControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, isAccepted, leaveBalance, totalDays, clockIn, clockOut, leaveDates, } = req.body;
        const id = parseInt(req.params.id);
        const accepted = yield (0, LeaveRequestService_1.acceptLeaveRequest)(id, isAccepted, employeeId, leaveBalance, totalDays, clockIn, clockOut, leaveDates);
        res.send({
            status: "success",
            message: "leave request accepted",
            data: accepted,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.acceptLeaveRequestControl = acceptLeaveRequestControl;
