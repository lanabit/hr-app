import { getLeaveRequests } from '../../../supports/api/leaveRequest';
import { useState, useEffect } from 'react';
import NewLeaveRequest from '../newLeaveRequest';
import AcceptLeaveRequest from '../acceptLeaveRequest';
import DenyLeaveRequest from '../denyLeaveRequest';

export default function HRLeaveRequestComponent({ employeeId }) {
  const [leaveData, setLeaveData] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeaveRequests();
      setLeaveData(data.filter((x) => x.status === 0));
      setConfirmedData(data.filter((x) => x.status > 0));
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
        id={employeeId}
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
        {leaveData.length > 0 ? (
          leaveData?.map((x, i) => {
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
                <div className="flex flex-col gap-2">
                  <div
                    onClick={() => acceptClickHandler(i)}
                    className="btn btn-outline btn-sm text-blue-500 hover:border-blue-500 hover:bg-blue-500"
                  >
                    Accept
                  </div>
                  <div
                    onClick={() => denyClickHandler(i)}
                    className="btn btn-outline btn-sm text-red-500 hover:border-red-500 hover:bg-red-500"
                  >
                    Decline
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='text-slate-600 text-center my-8 italic'>No Pending Leave Request</div>
        )}
      </div>
      <div className="w-[50vw] pt-20">
        <div className="py-5 text-xl">Past Leave Request</div>
        <div className="grid grid-cols-[10%_30%_60%] justify-items-center gap-2 border-y py-2">
          <div className="">Request ID</div>
          <div>Issuer</div>
          <div className="px-3">Details</div>
        </div>
        {confirmedData?.map((x, i) => {
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
                    <div className="rounded-full bg-red-200 px-2">Declined</div>
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
  );
}
