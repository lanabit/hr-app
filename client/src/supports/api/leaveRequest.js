import { axiosInstance } from '../../config/axios';
import { toast } from 'react-toastify';

const DateTransform = (dateData) => {
  return new Date(dateData);
};

export const getLeaveRequests = async () => {
  const totalLeaveDays = (start, end) => {
    const days =
      (DateTransform(end).getTime() - DateTransform(start).getTime()) /
      (1000 * 60 * 60 * 24);
    let totalLeave = 0;
    let leaveDates = [];
    let startDate = DateTransform(start);
    for (let j = 0; j <= days; j++) {
      let currDate = DateTransform(start).getDate();
      startDate.setDate(currDate + j);
      if (startDate.getDay() > 0 && startDate.getDay() < 6) {
        totalLeave++;
        leaveDates.push(new Date(startDate).toISOString());
      }
    }
    return { totalLeave: totalLeave, leaveDates: leaveDates };
  };

  try {
    let leaveRequests = await axiosInstance.get(`/leaverequests`);
    let a = leaveRequests.data.data;
    for (let i = 0; i < a.length; i++) {
      a[i].totalDays = totalLeaveDays(a[i].startDate, a[i].endDate).totalLeave;
      a[i].leaveDates = totalLeaveDays(a[i].startDate, a[i].endDate).leaveDates;
      a[i].startDate = DateTransform(a[i].startDate).toLocaleDateString(
        'us-US',
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );
      a[i].endDate = DateTransform(a[i].endDate).toLocaleDateString('us-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return leaveRequests.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const postLeaveRequest = async (data) => {
  let { employeeId, type, startDate, endDate } = data;
  startDate = DateTransform(startDate);
  endDate = DateTransform(endDate);

  let postData = {
    employeeId,
    type,
    startDate,
    endDate,
  };

  try {
    let leaveRequests = await axiosInstance.post(`/leaverequests`, postData);
    console.log('leaveRequest', leaveRequests);
    if (leaveRequests.data.status !== 'success') {
      throw new Error('Leave Request Failed');
    }
    toast.success('Leave request sent');
    return 'Leave request sent successfully';
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};

export const acceptLeaveRequest = async (id, data) => {
  try {
    console.log('id', id, 'typeof id:', typeof id);
    console.log(data);
    let { employeeId, employee, totalDays, leaveDates } = data;
    let leaveBalance = employee.leaveBalance;
    let clockIn = employee.shift.start;
    let clockOut = employee.shift.end;
    const patchData = {
      isAccepted: true,
      employeeId: employeeId,
      leaveBalance: leaveBalance,
      totalDays: totalDays,
      clockIn: clockIn,
      clockOut: clockOut,
      leaveDates: leaveDates,
    };

    let acceptRequest = await axiosInstance.patch(
      `/leaverequests/${id}`,
      patchData,
    );
    console.log(acceptRequest);
    if (acceptRequest.data.status !== 'success') {
      throw new Error('Leave Request Confirmation Failed');
    }

    toast.success('Leave request has been accepted');
    return 'Leave request has been accepted';
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};

export const denyLeaveRequest = async (id, data) => {
  try {
    console.log('id', id, 'typeof id:', typeof id);
    console.log(data);
    let { employeeId, employee, totalDays, leaveDates } = data;
    let leaveBalance = employee.leaveBalance;
    let clockIn = employee.shift.start;
    let clockOut = employee.shift.end;
    const patchData = {
      isAccepted: false,
      employeeId: employeeId,
      leaveBalance: leaveBalance,
      totalDays: totalDays,
      clockIn: clockIn,
      clockOut: clockOut,
      leaveDates: leaveDates,
    };

    let acceptRequest = await axiosInstance.patch(
      `/leaverequests/${id}`,
      patchData,
    );

    if (acceptRequest.data.status !== 'success') {
      throw new Error('Leave Request Decline Failed');
    }

    toast.success('Leave request has been declined');
    return 'Leave request has been declined';
  } catch (error) {
    toast.error(error.message);
    return error.message;
  }
};
