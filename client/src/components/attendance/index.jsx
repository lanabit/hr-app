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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>On Leave</th>
            <th>Deduction</th>
          </tr>
        </thead>
        <tbody className="z-auto">
          {attendanceData?.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.employeeId}</td>
                <td>{x.date}</td>
                <td>{x.clockIn}</td>
                <td>{x.clockOut}</td>
                <td>{x.isOnLeave ? 'On Leave' : 'Present'}</td>
                <td>{x.deduction}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
