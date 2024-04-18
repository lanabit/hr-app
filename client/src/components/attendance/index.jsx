import { getEmployees } from '../../supports/api/employee';
import { useEffect, useState, useRef } from 'react';
import { getAttendance } from '../../supports/api/attendance';

export default function AttendanceComponent() {
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
    <div className="rounded-lg border p-8">
      <div className="mb-5 flex flex-col">
        <div className="text-xl">Attendance Page</div>
        <div className="grid grid-cols-6">
          <div>ID</div>
          <div>Date</div>
          <div>Clock In</div>
          <div>Clock Out</div>
          <div>On Leave</div>
          <div>Deduction</div>
        </div>
        {attendanceData?.map((x, i) => {
          return (
            <div className="grid grid-cols-6 bg-pink-200">
              <div>{x.employeeId}</div>
              <div>{x.date}</div>
              <div>{x.clockIn}</div>
              <div>{x.clockOut}</div>
              <div>{x.isOnLeave ? 'On Leave' : 'Present'}</div>
              <div>{x.deduction}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
