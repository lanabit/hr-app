// import { axiosInstance } from "../../config/axios";
import { axiosInstance } from "../../../config/axios";

export const postAttendance = async (data) => {
  try {
    const UTC_DATETIME = "1970-01-01T18:00:00.000Z";
    let [dateTemp, timeTemp] = UTC_DATETIME.split("T");

    const timeConvert = (time) => {
      return dateTemp + "T" + time + ":00.000Z";
    };

    const dateConvert = (date) => {
      return date + "T" + timeTemp;
    };

    async function deductionLogic() {
      const DateTransform = (dateData) => {
        // dateData = JSON.stringify(dateData);
        return new Date(dateData);
      };

      const employeeData = await axiosInstance.get(`/employees/${id}`);
      console.log(employeeData.data.data);
      const salary = employeeData.data.data.position.salary;
      const shiftStart = DateTransform(employeeData.data.data.shift.start);
      console.log(shiftStart);
      const shiftEnds = DateTransform(employeeData.data.data.shift.end);
      console.log(shiftEnds);
      const newClockIn = DateTransform(clockIn);
      const newClockOut = DateTransform(clockOut);

      const denumerator = 1000 * 60; //milisecond to minute for getTime calculation

      const lateClockIn =
        newClockIn.getTime() - shiftStart.getTime() > 0
          ? (newClockIn.getTime() - shiftStart.getTime()) / denumerator
          : 0;

      const earlyClockOut =
        newClockOut.getTime() - shiftEnds.getTime() < 0
          ? Math.abs(newClockOut.getTime() - shiftEnds.getTime()) / denumerator
          : 0;

      const lostTime = Math.floor((lateClockIn + earlyClockOut) / 30);

      return lostTime * salary * 0.001;
    }

    let { clockIn, clockOut, date, employeeId } = data;
    const id = employeeId.toString();
    clockIn = timeConvert(clockIn);
    clockOut = timeConvert(clockOut);
    date = dateConvert(date);
    let isOnLeave = false;
    let deduction = await deductionLogic();

    // get employee data by employee id
    //create deduction function HERE
    // deduction = deductionLogic(employeeId)

    let postData = {
      date,
      clockIn,
      clockOut,
      isOnLeave,
      deduction,
    };

    console.log("new deduction", deduction);
    const newAttendance = await axiosInstance.post("/attendance", postData, {
      headers: { id: id },
    });

    console.log("data posted");
  } catch (error) {
    console.log(error);
  }
};

export const getAttendance = async () => {
  const attendance = await axiosInstance.get(`/attendance`);
  return attendance;
};
