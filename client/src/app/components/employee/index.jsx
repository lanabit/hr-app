import { getEmployees } from "../../supports/api/employee";
import { useEffect, useState, useRef } from "react";
import NewEmployee from "./newEmployee";
import EditEmployee from "./editEmployee";
import DeleteEmployee from "./deleteEmployee";

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

  useEffect(() => {
    // Add event listener to document body to handle clicks outside the table
    const handleClickOutsideTable = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null); // Reset selected row if clicked outside the table
      }
    };
    document.body.addEventListener("click", handleClickOutsideTable);
    console.log(employeeId);
    return () => {
      document.body.removeEventListener("click", handleClickOutsideTable); // Remove event listener on component unmount
    };
  }, [employeeId]);

  const clickHandler = (index) => {
    setSelectedRow(index); // Update selectedRow state when a row is clicked
    setEmployeeId(employeeData[index]);
  };

  return (
    <div ref={tableRef} className="p-8 rounded-lg border">
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl">Employee Page</div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowNewModal(true)}
            className={`p-2 px-5 rounded-lg text-white font-medium ${
              selectedRow === null ? `bg-blue-500` : `bg-slate-300`
            }`}
            disabled={selectedRow === null ? false : true}
          >
            New
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            className={`p-2 px-5 rounded-lg text-white font-medium ${
              selectedRow === null ? `bg-slate-300` : `bg-blue-500`
            }`}
            disabled={selectedRow === null ? true : false}
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className={`p-2 px-5 rounded-lg text-white font-medium ${
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
        <div className="grid grid-cols-6 gap-2 border-y py-2 justify-items-center">
          <div>Name</div>
          <div>Email</div>
          <div className="px-3">Position</div>
          <div>Shift Start</div>
          <div>Shift End</div>
          <div>Leave Balance</div>
        </div>
        {employeeData.map((x, i) => {
          return (
            <div
              key={i}
              onClick={() => clickHandler(i)}
              className={`grid py-2 grid-cols-6 gap-2 z-10 border-b hover:bg-blue-50 hover:cursor-pointer justify-items-center ${
                selectedRow == i ? "bg-blue-200 hover:bg-blue-200" : null
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
