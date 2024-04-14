"use client";
import Image from "next/image";
import { axiosInstance } from "../config/axios";
import { useEffect, useState } from "react";
import ClockIn from "./components/clockIn";

export default function Home() {
  const fetchData = async () => {
    try {
      const employeeData = await axiosInstance.get(`/employees`);
      console.log(employeeData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <ClockIn />
      </div>
    </div>
  );
}
