import { Request, Response } from "express";
import {
  getLeaveRequests,
  getLeaveRequestsByEmployeeId,
  createLeaveRequest,
  acceptLeaveRequest,
  getLeaveRequestsByRequestId,
} from "./LeaveRequestService";

export const showLeaveRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await getLeaveRequests();
    res.send({
      status: "success",
      data: employees,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const showLeaveRequestsByEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employees = await getLeaveRequestsByEmployeeId(id);
    res.send({
      status: "success",
      data: employees,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const showLeaveRequestsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employees = await getLeaveRequestsByRequestId(id);
    res.send({
      status: "success",
      data: employees,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const newLeaveRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const id = parseInt(req.params.id)
    const { employeeId, type, startDate, endDate } = req.body;
    const newEmployeeData = await createLeaveRequest(
      employeeId,
      type,
      startDate,
      endDate
    );

    res.send({
      status: "success",
      message: "leave request sent",
      data: newEmployeeData,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const acceptLeaveRequestControl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      employeeId,
      isAccepted,
      leaveBalance,
      totalDays,
      clockIn,
      clockOut,
      leaveDates,
    } = req.body;
    const id = parseInt(req.params.id);
    const accepted = await acceptLeaveRequest(
      id,
      isAccepted,
      employeeId,
      leaveBalance,
      totalDays,
      clockIn,
      clockOut,
      leaveDates
    );

    res.send({
      status: "success",
      message: "leave request accepted",
      data: accepted,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};
