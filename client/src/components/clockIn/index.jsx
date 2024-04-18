'use client';
import { useState, FormEvent } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { axiosInstance } from "@/config/axios";
import { postAttendance } from '../../supports/api/attendance';

export default function ClockIn() {
  return (
    <>
      <Formik
        initialValues={{
          employeeId: '',
          date: '',
          clockIn: '',
          clockOut: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          await postAttendance(values);
        }}
      >
        {({ dirty }) => {
          return (
            <Form>
              <div className="flex flex-col gap-2 text-lg">
                <label>Employee ID</label>
                <Field
                  className="border p-2"
                  type="number"
                  id="employeeId"
                  name="employeeId"
                ></Field>
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
