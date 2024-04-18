import { getEmployees } from '../../supports/api/employee';
import { useEffect, useState, useRef } from 'react';
import NewEmployee from './newEmployee';
import EditEmployee from './editEmployee';
import DeleteEmployee from './deleteEmployee';

export default function EmployeePage() {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployeeData(data);
    };

    fetchData();
  }, []);

  console.log('employee data:', employeeData);

  useEffect(() => {
    // Add event listener to document body to handle clicks outside the table
    const handleClickOutsideTable = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null); // Reset selected row if clicked outside the table
      }
    };
    document.body.addEventListener('click', handleClickOutsideTable);
    return () => {
      document.body.removeEventListener('click', handleClickOutsideTable); // Remove event listener on component unmount
    };
  }, [employeeId]);

  const clickHandler = (index) => {
    setSelectedRow(index); // Update selectedRow state when a row is clicked
    setEmployeeId(employeeData[index]);
  };

  return (
    <div ref={tableRef} className="rounded-lg border p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-xl">Employee Page</div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewModal(true)}
            className={`rounded-lg p-2 px-5 font-medium text-white ${
              selectedRow === null ? `bg-blue-500` : `bg-slate-300`
            }`}
            disabled={selectedRow === null ? false : true}
          >
            New
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className={`rounded-lg p-2 px-5 font-medium text-white ${
              selectedRow === null ? `bg-slate-300` : `bg-blue-500`
            }`}
            disabled={selectedRow === null ? true : false}
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={`rounded-lg p-2 px-5 font-medium text-white ${
              selectedRow === null ? `bg-slate-300` : `bg-red-500`
            }`}
            disabled={selectedRow === null ? true : false}
          >
            Delete
          </button>
        </div>
      </div>
      <NewEmployee
        close={() => setShowNewModal(false)}
        open={showNewModal}
      ></NewEmployee>
      <EditEmployee
        close={() => setShowEditModal(false)}
        open={showEditModal}
        data={employeeId}
      ></EditEmployee>
      <DeleteEmployee
        close={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        data={employeeId}
      ></DeleteEmployee>
      <div>
        <div className="grid grid-cols-6 justify-items-center gap-2 border-y py-2">
          <div>Name</div>
          <div>Email</div>
          <div className="px-3">Position</div>
          <div>Shift Start</div>
          <div>Shift End</div>
          <div>Leave Balance</div>
        </div>
        {employeeData?.map((x, i) => {
          return (
            <div
              key={i}
              onClick={() => clickHandler(i)}
              className={`z-10 grid grid-cols-6 justify-items-center gap-2 border-b py-2 hover:cursor-pointer ${
                selectedRow == i
                  ? 'bg-blue-200 hover:bg-blue-200'
                  : 'hover:bg-blue-50'
              }`}
            >
              <div>{x.name}</div>
              <div>{x.email}</div>
              <div className="px-3">{x.position.positionName}</div>
              <div>{x.start}</div>
              <div>{x.end}</div>
              <div>{x.leaveBalance}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
