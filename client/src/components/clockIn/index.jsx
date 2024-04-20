'use client';
import { Form, Formik, Field } from 'formik';
import { postAttendance } from '../../supports/api/attendance';
import { useRouter } from 'next/router';

export default function ClockIn() {
  const navigate = () => {
    route = useRouter();
    return route;
  };
  let userId = JSON.parse(localStorage.getItem('user'))?.id;
  return (
    <>
      <Formik
        initialValues={{
          employeeId: userId,
          date: '',
          clockIn: '',
          clockOut: '00:00',
        }}
        onSubmit={async (values) => {
          await postAttendance(values);
          window.location.reload();
          navigate('/dashboard');
        }}
      >
        {({ dirty }) => {
          return (
            <Form>
              <div className="flex flex-col gap-2 text-lg">
                <label>Date</label>
                <Field
                  className="border p-2"
                  type="date"
                  id="date"
                  name="date"
                />
                <label>Clock In Time</label>
                <Field
                  className="border p-2"
                  type="time"
                  id="clockIn"
                  name="clockIn"
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
