// import { axiosInstance } from "../../config/axios";
import { axiosInstance } from '../../config/axios';
import { toast } from 'react-toastify';

const DateTransform = (dateData) => {
  return new Date(dateData);
};

const timeConvert = (time) => {
  const UTC_DATETIME = '1970-01-01T18:00:00.000Z';
  let [dateTemp, timeTemp] = UTC_DATETIME.split('T');
  return dateTemp + 'T' + time + ':00.000Z';
};

const dateConvert = (date) => {
  const UTC_DATETIME = '1970-01-01T18:00:00.000Z';
  let [dateTemp, timeTemp] = UTC_DATETIME.split('T');
  return date + 'T' + timeTemp;
};

export const getAttendance = async () => {
  try {
    const attendance = await axiosInstance.get(`/attendance`);
    let a = attendance.data.data;
    for (let x of a) {
      x.date = new Date(x.date).toDateString();
      x.clockIn = TimeDisplay(x.clockIn);
      x.clockOut = TimeDisplay(x.clockOut);
      x.deduction = x.deduction.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    }
    return attendance.data.data;
  } catch (error) {
    return console.log(error);
  }
};

export const postAttendance = async (data) => {
  try {
    let { clockIn, clockOut, date, employeeId } = data;
    const id = employeeId.toString();
    clockIn = timeConvert(clockIn);
    console.log('clockin post', clockIn);
    clockOut = timeConvert(clockOut);
    console.log('clockout post', clockOut);
    date = dateConvert(date);
    console.log('date post', date);
    let isOnLeave = false;
    let deduction = 0;
    let postData = {
      date,
      clockIn,
      clockOut,
      isOnLeave,
      deduction,
    };

    const newAttendance = await axiosInstance.post('/attendance', postData, {
      headers: { id: id },
    });

    if (newAttendance.data.status !== 'success') {
      throw new Error('Create new attendance failed.');
    }
    let storedData = JSON.parse(localStorage.getItem('user'));
    storedData.attendanceId = newAttendance.data.data.id;
    storedData.isClockedIn = true;

    localStorage.setItem('user', JSON.stringify(storedData));

    toast.success('Clock-in Successful');
  } catch (error) {
    toast.error(error.message ? error.message : 'Clock-in Failed');
  }
};

const TimeDisplay = (dateData) => {
  return (
    new Date(dateData).getUTCHours().toString().padStart(2, '0') +
    ':' +
    new Date(dateData).getUTCMinutes().toString().padStart(2, '0')
  );
};

export const clockOutAttendance = async (id, data) => {
  try {
    let { clockOut } = data;

    clockOut = timeConvert(clockOut);

    const logClockOut = await axiosInstance.patch(
      `/attendance`,
      { clockOut: clockOut },
      {
        headers: { id: id },
      },
    );

    if (logClockOut.data.status !== 'success') {
      throw new Error('Clock-out failed');
    }

    let storedData = JSON.parse(localStorage.getItem('user'));
    storedData.isClockedOut = true;
    localStorage.setItem('user', JSON.stringify(storedData));
    toast.success('Clock-out Successful');
  } catch (error) {
    toast.error(error.message);
  }
};
