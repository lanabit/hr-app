'use client';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { clockOutAttendance } from '../../supports/api/attendance';

export default function ClockOut() {
  let userId = JSON.parse(localStorage.getItem('user'))?.id;
  let attendanceId = JSON.parse(localStorage.getItem('user'))?.attendanceId;

  return (
    <>
      <Formik
        initialValues={{
          employeeId: userId,
          clockOut: '',
        }}
        onSubmit={async (values) => {
          await clockOutAttendance(attendanceId, values);
          window.location.reload();
        }}
      >
        {({ dirty }) => {
          return (
            <Form>
              <div className="flex flex-col gap-2 text-lg">
                <label>Clock Out Time</label>
                <Field
                  className="border p-2"
                  type="time"
                  id="clockOut"
                  name="clockOut"
                />
                <button type="submit" className="border bg-slate-300 p-2">
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
