"use client";
import React from "react";
import { FiLayers, FiShoppingCart } from "react-icons/fi";
import { LuShoppingCart, LuCheck } from "react-icons/lu";
import { FaRegCreditCard } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { LiaTruckSolid } from "react-icons/lia";
import Dashboardproduct from "../components/Table-dashboard/page";
import BrowserPieChart from "../chart/BrowserPieChart.jsx/page";
import InternetUsersChart from "../chart/InternetUsersChart.jsx/page";

export default function DashboardOverview() {
  return (
    <main className="w-full  max-w-[1353px] mx-auto pb-5">
      <h1 className="text-[23px] py-7 font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 px-0.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-2.5 items-start">
        <div className="bg-[#0d9488] text-white rounded-md shadow-md px-5 flex flex-col items-center py-6 min-h-[190px]">
          <FiLayers className="h-[30px] w-[30px] mb-1" />
          <h3 className="text-md mb-2 mt-1">Today Orders</h3>
          <p className="text-2xl font-semibold">$1073.15</p>
          <div className="mt-2 flex gap-10 text-xs opacity-90 text-center">
            <p>
              Cash:
              <br />
              $1073.15
            </p>
            <p>
              Card:
              <br />
              $0.00
            </p>
            <p>
              Credit:
              <br />
              $0.00
            </p>
          </div>
        </div>

        <div className="bg-[#fb923c] text-white rounded-md shadow-md px-5 flex flex-col items-center py-6 min-h-[190px]">
          <FiLayers className="h-[30px] w-[30px] mb-1" />
          <h3 className="text-md mb-2 mt-1">Yesterday Orders</h3>
          <p className="text-2xl font-semibold">$0.00</p>
          <div className="mt-2 flex gap-10 text-xs opacity-90 text-center">
            <p>
              Cash:
              <br />
              $0.00
            </p>
            <p>
              Card:
              <br />
              $0.00
            </p>
            <p>
              Credit:
              <br />
              $0.00
            </p>
          </div>
        </div>

        <div className="bg-[#3b82f6] text-white rounded-md shadow-md px-5 flex flex-col items-center py-6 xl:min-h-[190px] ">
          <LuShoppingCart className="h-[30px] w-[30px] mb-1" />
          <h3 className="text-md mb-2 mt-1">This Month</h3>
          <p className="text-2xl font-semibold">$2465.04</p>
        </div>

        <div className="bg-[#0891b2] text-white rounded-md shadow-md px-5 flex flex-col items-center py-6 xl:min-h-[190px]">
          <FaRegCreditCard className="h-[30px] w-[30px] mb-1" />
          <h3 className="text-md mb-2 mt-1">Last Month</h3>
          <p className="text-2xl font-semibold">$23725.67</p>
        </div>

        <div className="bg-[#059669] text-white rounded-md shadow-md px-5 flex flex-col items-center py-6 xl:min-h-[190px]">
          <FaRegCreditCard className="h-[30px] w-[30px] mb-1" />
          <h3 className="text-md mb-2 mt-1">All-Time Sales</h3>
          <p className="text-2xl font-semibold">$1077759.89</p>
        </div>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
        <div className="bg-white dark:bg-gray-950 dark:border-gray-800  rounded-lg px-6 py-[22px] flex items-center space-x-4 border border-gray-200">
          <div className="bg-[#ffedd5] dark:bg-[#f97316] dark:text-white text-[#f6aa7b]  p-4 rounded-full">
            <FiShoppingCart size={18} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 pt-1 text-sm">
              Total Order
            </p>
            <p className="text-gray-700 dark:text-white font-semibold text-2xl">
              1189
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 dark:border-gray-800 rounded-lg px-6 py-[22px] flex items-center space-x-4 border border-gray-200">
          <div className="bg-[#dbeafe] dark:bg-[#3b82f6] dark:text-white text-[#2663eb] p-4 rounded-full">
            <TfiReload className="h-[17px] w-[17px]" />
          </div>
          <div>
            <p className="text-gray-500 pt-1 dark:text-gray-400  text-sm">
              Orders Pending
              <span className="text-red-500 text-sm font-bold">(14937.23)</span>
            </p>
            <p className="text-gray-700 dark:text-white  font-semibold text-2xl">
              34
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 dark:border-gray-800 rounded-lg px-6 py-[22px] flex items-center space-x-4 border border-gray-200">
          <div className="bg-[#ccfbf1] dark:bg-[#14b8a6] dark:text-white text-[#0f9589] p-[15px] rounded-full">
            <LiaTruckSolid size={18} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400  pt-1 text-sm">
              Orders Processing
            </p>
            <p className="text-gray-700 dark:text-white  font-semibold text-2xl">
              12
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 dark:border-gray-800 rounded-lg px-6 py-[22px] flex items-center space-x-4 border border-gray-200">
          <div className="bg-[#d1fae5] dark:bg-[#10b981] dark:text-white text-[#059669] p-[15px] rounded-full">
            <LuCheck size={19} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 pt-1 text-sm">
              Orders Delivered
            </p>
            <p className="text-gray-700 dark:text-white  font-semibold text-2xl">
              43
            </p>
          </div>
        </div>
      </div>
      <div className="grid  sm:grid-cols-2 text-black dark:text-white w-full gap-5 ">
        <InternetUsersChart />
        <BrowserPieChart />
      </div>

      <Dashboardproduct />
    </main>
  );
}
