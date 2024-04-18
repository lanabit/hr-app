import { getLeaveRequests } from '../../supports/api/leaveRequest';
import { useState, useEffect } from 'react';
import NewLeaveRequest from './newLeaveRequest';
import AcceptLeaveRequest from './acceptLeaveRequest';
import DenyLeaveRequest from './denyLeaveRequest';

export default function LeaveRequestComponent() {
  const [leaveData, setLeaveData] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaveRequests();
      setLeaveData(data);
    };

    fetchData();
  }, []);

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
    <div /* ref={tableRef} */ className="rounded-lg border p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-xl">Leave Request Page</div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewModal(true)}
            className={`} rounded-lg bg-blue-500 p-2 px-5 font-medium
            text-white`}
          >
            New
          </button>
        </div>
      </div>
      <NewLeaveRequest
        close={() => setShowNewModal(false)}
        open={showNewModal}
      ></NewLeaveRequest>
      <AcceptLeaveRequest
        close={() => setShowAcceptModal(false)}
        open={showAcceptModal}
        data={requestData}
      ></AcceptLeaveRequest>
      <DenyLeaveRequest
        close={() => setShowDenyModal(false)}
        open={showDenyModal}
        data={requestData}
      ></DenyLeaveRequest>
      <div className="w-[50vw]">
        <div className="grid grid-cols-[10%_20%_50%_10%] justify-items-center gap-2 border-y py-2">
          <div className="">Request ID</div>
          <div>Issuer</div>
          <div className="px-3">Details</div>
          <div>Action</div>
        </div>
        {leaveData?.map((x, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[10%_20%_50%_10%] justify-items-center gap-2 py-2"
            >
              <div>{x.id}</div>
              <div>
                <div>
                  {x.employee.name} (ID: {x.employee.id})
                </div>
                <div>Leave Balance: {x.employee.leaveBalance}</div>
              </div>
              <div>
                <div>Start Date: {x.startDate}</div>
                <div>End Date: {x.endDate}</div>
                <div>Total Leave Days: {x.totalDays}</div>
                <div>
                  Status:{' '}
                  {x.status === 1
                    ? 'Accepted'
                    : x.status === 2
                      ? 'Declined'
                      : 'Pending'}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => acceptClickHandler(i)}
                  className="rounded-lg bg-blue-300 px-3 py-2 text-white hover:cursor-pointer hover:bg-blue-500"
                >
                  Accept
                </div>
                <div
                  onClick={() => denyClickHandler(i)}
                  className="rounded-lg bg-red-300 px-3 py-2 text-white hover:cursor-pointer hover:bg-red-500"
                >
                  Decline
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
