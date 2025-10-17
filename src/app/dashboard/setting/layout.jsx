"use client";
import { useState, useRef, useEffect } from "react";
import Toast from "@/app/(marketing)/components/Toast";
import Tableorder from "@/app/components/Table-orders/page";

export default function Settinglayout({ children })  {
  return (
    <div className=" bg-[#f8f7f4]  dark:bg-gray-900  max-w-[1350px] mx-auto sm:pb-4 ">
      <h1 className="text-[23px] py-7  sm:mb-3 lg:mb-0 font-bold text-gray-800 dark:text-gray-300">
        Global Setting
      </h1>
      <div>{children}</div>
    </div>
  );
}
