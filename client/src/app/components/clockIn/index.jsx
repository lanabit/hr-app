"use client";
import { useState, FormEvent } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { axiosInstance } from "@/config/axios";
import { postAttendance } from "../../supports/api/attendance";

export default function ClockIn() {
  return (
    <>
      <Formik
        initialValues={{
          employeeId: "",
          date: "",
          clockIn: "",
          clockOut: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await postAttendance(values);
        }}
      >
        {({ dirty }) => {
          return (
            <Form>
              <div className="text-lg flex flex-col gap-2">
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
                <button type="submit" className="border p-2 bg-slate-300">
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
