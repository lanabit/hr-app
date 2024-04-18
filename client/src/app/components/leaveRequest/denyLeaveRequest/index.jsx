import { useState, useEffect } from "react";
import { denyLeaveRequest } from "../../../supports/api/leaveRequest";

export default function DenyLeaveRequest({ open, close, data }) {
  if (!open) return null;
  console.log("cekdata", data.name);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const closeHandler = (e) => {
    if (e.target.id === "popup-bg") {
      close();
    }
    if (e.target.id === "close-btn") {
      close();
      window.location.reload();
    }
  };

  const submitHandler = async (values) => {
    try {
      console.log("submit handler data acceptLeaveRequest", values);
      setMessage(await denyLeaveRequest(data.id, data));
      setUpdateSuccess(true); // Set Update success to true
    } catch (error) {
      console.error(error);
      setUpdateSuccess(false); // Set Update success to false if there's an error
    }
  };

  return (
    <>
      {updateSuccess ? (
        <div
          id="popup-bg"
          onClick={closeHandler}
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded w-[30%] h-[60%] p-12 flex flex-col gap-8">
            <div className="flex flex-col my-auto">
              <div className="mx-auto font-bold">{message}</div>
              <button
                id="close-btn"
                onClick={closeHandler}
                className="mt-8 rounded-lg border p-2 bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="popup-bg"
          onClick={closeHandler}
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded w-[30%] h-[60%] p-12 flex flex-col gap-8">
            <div className="font-bold mx-auto">Deny Leave Request</div>
            <div className="mx-auto">{`Deny leave request with Request ID ${data.id} issued by ${data.employee.name}?`}</div>
            <button
              onClick={submitHandler}
              type="submit"
              className="mt-8 rounded-lg border p-2 bg-slate-300"
            >
              Yes, Deny Request
            </button>
          </div>
        </div>
      )}
    </>
  );
}
