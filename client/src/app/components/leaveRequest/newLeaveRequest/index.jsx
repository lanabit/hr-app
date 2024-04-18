import { Form, Formik, Field, ErrorMessage } from "formik";
import { newEmployee } from "../../../supports/api/employee";
import { useState } from "react";
import { postLeaveRequest } from "../../../supports/api/leaveRequest";

export default function NewLeaveRequest({ open, close }) {
  if (!open) return null;

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
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
      console.log(values);
      setMessage(await postLeaveRequest(values));
      setSubmissionSuccess(true); // Set submission success to true
    } catch (error) {
      console.error(error);
      setSubmissionSuccess(false); // Set submission success to false if there's an error
    }
  };

  return (
    <>
      {submissionSuccess ? (
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
            <div className="font-bold mx-auto">Issue New Leave Request</div>
            <Formik
              initialValues={{
                employeeId: "",
                type: "Annual Leave",
                startDate: "",
                endDate: "",
              }}
              onSubmit={submitHandler}
            >
              {({ dirty }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-2">
                      <label>Employee ID</label>
                      <Field
                        className="border p-2"
                        type="number"
                        id="employeeId"
                        name="employeeId"
                      />
                      <label>Type</label>
                      <Field
                        className="border p-2"
                        as="select"
                        id="types"
                        name="types"
                      >
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                      </Field>
                      <label>Start Date</label>
                      <Field
                        className="border p-2"
                        type="date"
                        id="startDate"
                        name="startDate"
                      />
                      <label>End Date</label>
                      <Field
                        className="border p-2"
                        type="date"
                        id="endDate"
                        name="endDate"
                      />
                      <button
                        type="submit"
                        className="mt-8 rounded-lg border p-2 bg-slate-300"
                      >
                        Send
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
