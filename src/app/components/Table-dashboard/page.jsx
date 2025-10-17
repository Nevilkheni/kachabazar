"use client";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import dashboardData from "@/app/data/dashboard.json";
import { HiOutlineMagnifyingGlassPlus } from "react-icons/hi2";
import { SlPrinter } from "react-icons/sl";

import PaginationComponent from "@/app/components/PaginationComponent";

export default function Dashboardproduct() {
  const [orders] = useState(dashboardData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-pink-500  text-white";
      case "Delivered":
        return "bg-teal-400 text-white";
      case "Cancel":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-[23px] font-semibold pb-4 py-2 ">Recent Order</h2>
      <div className="bg-white dark:bg-gray-800 p-5 border-[1px] border-gray-100 dark:border-gray-800  rounded-lg">
        <div className="overflow-x-auto borde border-[1px] border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-black dark:text-gray-300">
              <tr>
                <th className="p-3 text-xs font-bold">INVOICE NO</th>
                <th className="p-3 text-xs font-bold">ORDER TIME</th>
                <th className="pl-2 pr-3 py-3 text-xs font-bold">CUSTOMER NAME</th>
                <th className="p-3 text-xs font-bold">METHOD</th>
                <th className="p-3 text-xs font-bold">AMOUNT</th>
                <th className="p-3 text-xs font-bold">STATUS</th>
                <th className="p-3 text-xs font-bold">ACTION</th>
                <th className="p-3 text-xs font-bold text-end">INVOICE</th>
              </tr>
            </thead>

            <tbody className="dark:bg-gray-900 ">
              {paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200  dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-3 py-[11px]  font-semibold text-xs text-gray-800 dark:text-gray-100">
                    {order.invoiceNo}
                  </td>
                  <td className="px-3 text-gray-900 dark:text-gray-100">
                    {order.orderTime}
                  </td>
                  <td className="pl-2 pr-3 text-gray-600 dark:text-gray-100">
                    {order.customerName}
                  </td>
                  <td className="px-3 font-semibold text-gray-800 dark:text-gray-100">
                    {order.method}
                  </td>
                  <td className="px-3 font-semibold text-gray-800 dark:text-gray-100">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-3">
                    <span
                      className={`px-2 py-1 text-xs  font-semibold rounded-md ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-3">
                    <div className="relative">
                      <button className=" w-full max-w-[170px] flex items-center justify-between border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md px-3 py-1.5 text-sm font-medium">
                        {order.status}
                        <MdOutlineKeyboardArrowDown className="text-gray-500 text-xl" />
                      </button>
                    </div>
                  </td>

                  <td className=" py-2  text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-end gap-[18px] px-5">
                      <SlPrinter className="cursor-pointer hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-bold text-[18px]" />
                      <HiOutlineMagnifyingGlassPlus className="cursor-pointer text-gray-500 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white text-[20px]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6  py-2">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
