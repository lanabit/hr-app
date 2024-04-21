import { getLeaveRequests } from '../../../supports/api/leaveRequest';
import { useState, useEffect } from 'react';
import NewLeaveRequest from '../newLeaveRequest';
import { PlusIcon } from '@radix-ui/react-icons';

export default function EmployeeLeaveRequestComponent({ employeeId }) {
  const [leaveData, setLeaveData] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaveRequests();
      setLeaveData(data.filter((x) => x.employeeId == employeeId));
    };

    fetchData();
  }, []);

  console.log('leave data:', leaveData);

  const acceptClickHandler = (index) => {
    setRequestData(leaveData[index]);
    setShowAcceptModal(true);
  };

  const denyClickHandler = (index) => {
    setRequestData(leaveData[index]);
    setShowDenyModal(true);
  };

  // console.log(leaveData);

  return (
    <div className="rounded-lg border p-8">
      <div className="text-2xl font-medium text-stone-600">Leave Request</div>
      <div className="mb-5 flex justify-between">
        <div className="w-[50vw]">
          <div className="flex items-center justify-between py-4">
            <div className="text-lg font-medium text-stone-600">History</div>
            <button
              onClick={() => setShowNewModal(true)}
              className={`btn btn-sm bg-blue-500 text-white hover:bg-blue-600`}
            >
              <PlusIcon />
              New Request
            </button>
          </div>
          <div className="grid grid-cols-[10%_30%_60%] justify-items-center gap-2 border-y py-2">
            <div className="">Request ID</div>
            <div>Issuer</div>
            <div className="px-3">Details</div>
          </div>
          {leaveData?.map((x, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-[10%_30%_60%] justify-items-center gap-2 py-2"
              >
                <div>{x.id}</div>
                <div>
                  <div>
                    {x.employee.name} (ID: {x.employee.id})
                  </div>
                  <div>Leave Balance: {x.employee.leaveBalance}</div>
                </div>
                <div>
                  <div>Type: {x.type}</div>
                  <div>Start Date: {x.startDate}</div>
                  <div>End Date: {x.endDate}</div>
                  <div>Total Leave Days: {x.totalDays}</div>
                  <div className="flex gap-2">
                    Status:
                    {x.status === 1 ? (
                      <div className="rounded-full bg-green-200 px-2">
                        Accepted
                      </div>
                    ) : x.status === 2 ? (
                      <div className="rounded-full bg-red-200 px-2">
                        Declined
                      </div>
                    ) : (
                      <div className="rounded-full bg-stone-200 px-2">
                        Pending
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NewLeaveRequest
        close={() => setShowNewModal(false)}
        open={showNewModal}
        id={employeeId}
      ></NewLeaveRequest>
    </div>
  );
}
