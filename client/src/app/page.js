'use client';
import Image from 'next/image';
import { axiosInstance } from '../config/axios';
import { useEffect, useState } from 'react';
import ClockIn from './components/clockIn';
import AttendancePage from './components/attendance';
import EmployeePage from './components/employee';
import LeaveRequestPage from './components/leaveRequest';

export default function Home() {
  return (
    <div>
      <div className="m-8 flex flex-col items-center justify-center gap-12">
        <EmployeePage />
        <ClockIn />
        <AttendancePage></AttendancePage>
        <LeaveRequestPage />
      </div>
    </div>
  );
}
