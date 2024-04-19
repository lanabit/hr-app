import HRLeaveRequest from './HRLeaveRequest';
import EmployeeLeaveRequest from './employeeLeaveRequest';

export default function LeaveRequestComponent() {
  let isHR = JSON.parse(localStorage.getItem('user'))?.isHRAdmin;
  let userId = JSON.parse(localStorage.getItem('user'))?.id;

  return (
    <>
      {isHR ? (
        <HRLeaveRequest employeeId={userId}></HRLeaveRequest>
      ) : (
        <EmployeeLeaveRequest employeeId={userId}></EmployeeLeaveRequest>
      )}
    </>
  );
}
