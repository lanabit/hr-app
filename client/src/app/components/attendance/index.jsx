import { getEmployees } from "../../supports/api/employee";
import { useEffect, useState, useRef } from "react";
import { getAttendance } from "../../supports/api/attendance";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttendance();
      setAttendanceData(data);
    };

    fetchData();
  }, []);

  console.log(attendanceData);
  return (
    <div className="p-8 rounded-lg border">
      <div className="flex flex-col mb-5">
        <div className="text-xl">Attendance Page</div>
        <div className="grid grid-cols-6">
          <div>ID</div>
          <div>Date</div>
          <div>Clock In</div>
          <div>Clock Out</div>
          <div>On Leave</div>
          <div>Deduction</div>
        </div>
        {attendanceData.map((x, i) => {
          return (
            <div className="bg-pink-200 grid grid-cols-6">
              <div>{x.employeeId}</div>
              <div>{x.date}</div>
              <div>{x.clockIn}</div>
              <div>{x.clockOut}</div>
              <div>{x.isOnLeave ? "On Leave" : "Present"}</div>
              <div>{x.deduction}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
