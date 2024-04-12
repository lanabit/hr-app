"use client";
import Image from "next/image";
import { axiosInstance } from "@/config/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const fetchData = async () => {
    try {
      const getData = await axiosInstance.get("/test");
      console.log(getData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div className="flex h-screen items-center justify-center">test</div>;
}
