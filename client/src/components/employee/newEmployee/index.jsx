import { Form, Formik, Field, ErrorMessage } from 'formik';
import { newEmployee } from '../../../supports/api/employee';
import { useState } from 'react';
export default function NewEmployee({ open, close }) {
  if (!open) return null;

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const closeHandler = (e) => {
    if (e.target.id === 'popup-bg') {
      close();
    }
    if (e.target.id === 'close-btn') {
      close();
      window.location.reload();
    }
  };

  const submitHandler = async (values) => {
    try {
      console.log(values);
      setMessage(await newEmployee(values));
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
        >
          <div className="flex  h-[60%] w-[30%] flex-col gap-8 rounded bg-white p-12">
            <div className="my-auto flex flex-col">
              <div className="mx-auto font-bold">{message}</div>
              <button
                id="close-btn"
                onClick={closeHandler}
                className="mt-8 rounded-lg border bg-slate-300 p-2"
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
        >
          <div className="flex h-[60%] w-[30%] flex-col gap-8 rounded bg-white p-12 ">
            <div className="mx-auto font-bold">Create New Employee Data</div>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                shiftId: '1',
                positionId: '1',
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
                        className="mt-8 rounded-lg border bg-slate-300 p-2"
                      >
                        Create
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
