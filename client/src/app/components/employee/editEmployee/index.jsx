import { Form, Formik, Field, ErrorMessage } from "formik";
import { editEmployee, getEmployeeById } from "../../../supports/api/employee";
import { useState, useEffect } from "react";

export default function EditEmployee({ open, close, data }) {
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

  const submitHandler = async (values, { resetForm }) => {
    try {
      console.log(values);
      setMessage(await editEmployee(data.id, values));
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
            <div className="font-bold mx-auto">Update Employee Data</div>
            <div className="mx-auto">{`Updating data for ${data.name} (ID: ${data.id})`}</div>
            <Formik
              initialValues={{
                name: data.name,
                email: data.email,
                password: data.password,
                shiftId: data.shiftId.toString(),
                positionId: data.positionId.toString(),
              }}
              onSubmit={submitHandler}
            >
              {({ dirty }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-2">
                      <label>Name</label>
                      <Field
                        className="border p-2"
                        type="text"
                        id="name"
                        name="name"
                      />
                      <label>Email</label>
                      <Field
                        className="border p-2"
                        type="email"
                        id="email"
                        name="email"
                      />
                      <label>Password</label>
                      <Field
                        className="border p-2"
                        type="password"
                        id="password"
                        name="password"
                      />
                      <label>Position</label>
                      <Field
                        className="border p-2"
                        as="select"
                        id="positionId"
                        name="positionId"
                      >
                        <option value="3">Programmer</option>
                        <option value="2">Product/Project Manager</option>
                        <option value="1">Manager</option>
                      </Field>
                      <label>Shift</label>
                      <Field
                        className="border p-2"
                        as="select"
                        id="shiftId"
                        name="shiftId"
                      >
                        <option value="1">09:00 - 18.00</option>
                        <option value="2">13.00 - 22.00</option>
                      </Field>
                      <button
                        type="submit"
                        className="mt-8 rounded-lg border p-2 bg-slate-300"
                      >
                        Update
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
