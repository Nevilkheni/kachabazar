"use client";
import { useState, useMemo } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import orderData from "@/app/data/order.json";
import { HiOutlineMagnifyingGlassPlus } from "react-icons/hi2";
import { SlPrinter } from "react-icons/sl";
import { IoCloudDownloadOutline } from "react-icons/io5";
import PaginationComponent from "@/app/components/PaginationComponent";

export default function Tableorder() {
  const [orders] = useState(orderData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderLimitFilter, setOrderLimitFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [orderLimitOpen, setOrderLimitOpen] = useState(false);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        search === "" ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.invoiceNo.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPaymentMethod =
        paymentMethodFilter === "all" ||
        order.method.toLowerCase() === paymentMethodFilter.toLowerCase();

      let matchesDateRange = true;
      if (startDate && endDate) {
        const orderDate = new Date(order.orderTime);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        matchesDateRange = orderDate >= start && orderDate <= end;
      }

      let matchesOrderLimit = true;
      if (orderLimitFilter !== "all") {
        const days = parseInt(orderLimitFilter);
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - days);
        const orderDate = new Date(order.orderTime);
        matchesOrderLimit = orderDate >= limitDate;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesDateRange &&
        matchesOrderLimit
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    paymentMethodFilter,
    startDate,
    endDate,
    orderLimitFilter,
  ]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-pink-500 dark:bg-[#973870] text-white dark:text-gray-300";
      case "Delivered":
        return "bg-teal-400 dark:bg-[#157b78] text-white dark:text-gray-300";
      case "Cancel":
        return "bg-red-500 dark:bg-[#9b334c] text-white dark:text-gray-300";
      case "Pending":
        return "bg-orange-500 dark:bg-[#9e5221] text-white dark:text-gray-300";
      default:
        return "bg-gray-400 text-white dark:text-gray-300";
    }
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setOrderLimitFilter("all");
    setPaymentMethodFilter("all");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const handleDownloadAll = () => {
    console.log("Downloading all filtered orders:", filteredOrders);
  };

  const handlePrint = (order) => {
    console.log("Printing order:", order);
  };

  const handleViewDetails = (order) => {
    console.log("Viewing order details:", order);
  };

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Changing order ${orderId} status to: ${newStatus}`);
  };

  const statusOptions = [
    { label: "Status", value: "all" },
    { label: "Delivered", value: "delivered" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Cancel", value: "cancel" },
  ];

  const timeoptions = [
    { label: "Order limits", value: "all" },
    { label: "Last 5 days orders", value: "5" },
    { label: "Last 7 days orders", value: "7" },
    { label: "Last 15 days orders", value: "15" },
    { label: "Last 30 days orders", value: "30" },
  ];

  const methodoptions = [
    { label: "Cash", value: "all" },
    { label: "Card", value: "card" },
    { label: "Credit", value: "credit" },
  ];

  const getStatusDisplayLabel = () => {
    const option = statusOptions.find((opt) => opt.value === statusFilter);
    return option ? option.label : "Status";
  };

  const getOrderLimitDisplayLabel = () => {
    const option = timeoptions.find((opt) => opt.value === orderLimitFilter);
    return option ? option.label : "Order limits";
  };

  const getPaymentMethodDisplayLabel = () => {
    const option = methodoptions.find(
      (opt) => opt.value === paymentMethodFilter
    );
    return option ? option.label : "Cash";
  };

  return (
    <div className="bg-white dark:bg-gray-800 px-6 dark:border-gray-800 rounded-lg">
      <div className="w-full bg-white rounded-lg">
        <div className="grid md:grid-cols-5 py-5 gap-4 md:gap-2 lg:gap-4 xl:gap-6 items-center pb-[18px] md:pb-[22px] dark:bg-gray-800">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-200 dark:border-gray-500 dark:bg-gray-800 w-full rounded-md px-3 py-[9px] text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />

          <div className="relative w-full">
            <div
              onClick={() => {
                setStatusOpen(!statusOpen);
                setOrderLimitOpen(false);
                setPaymentMethodOpen(false);
              }}
              className="border dark:bg-gray-800 dark:border-gray-700 border-gray-200 w-full cursor-pointer appearance-none rounded-md px-3 py-[9px] text-sm flex justify-between items-center focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <span>{getStatusDisplayLabel()}</span>
              <RiArrowDownSLine
                className="text-gray-500 pointer-events-none"
                size={18}
              />
            </div>
            {statusOpen && (
              <div className="absolute w-full border dark:bg-gray-800 cursor-pointer dark:border-gray-700 border-gray-200 mt-1 rounded-md bg-white shadow-lg z-20 max-h-60 overflow-y-auto">
                {statusOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      setStatusFilter(opt.value);
                      setStatusOpen(false);
                      setCurrentPage(1);
                    }}
                    className="px-8 py-2  cursor-pointer hover:bg-gray-100 m-1   dark:hover:bg-gray-700 text-sm"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <div
              onClick={() => {
                setOrderLimitOpen(!orderLimitOpen);
                setStatusOpen(false);
                setPaymentMethodOpen(false);
              }}
              className="border dark:bg-gray-800 dark:border-gray-700 border-gray-200 w-full cursor-pointer appearance-none rounded-md px-3 py-[9px] text-sm flex justify-between items-center focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <span>{getOrderLimitDisplayLabel()}</span>
              <RiArrowDownSLine
                className="text-gray-500 pointer-events-none"
                size={18}
              />
            </div>
            {orderLimitOpen && (
              <div className="absolute w-full border dark:bg-gray-800 dark:border-gray-700 border-gray-200 mt-1 rounded-md bg-white shadow-lg z-20 max-h-60 overflow-y-auto">
                {timeoptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      setOrderLimitFilter(opt.value);
                      setOrderLimitOpen(false);
                      setCurrentPage(1);
                    }}
                    className="px-8 py-2  cursor-pointer hover:bg-gray-100 m-1   dark:hover:bg-gray-700 text-sm"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <div
              onClick={() => {
                setPaymentMethodOpen(!paymentMethodOpen);
                setStatusOpen(false);
                setOrderLimitOpen(false);
              }}
              className="border dark:bg-gray-800 dark:border-gray-700 border-gray-200 w-full cursor-pointer appearance-none rounded-md px-3 py-[9px] text-sm flex justify-between items-center focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <span>{getPaymentMethodDisplayLabel()}</span>
              <RiArrowDownSLine
                className="text-gray-500 pointer-events-none"
                size={18}
              />
            </div>
            {paymentMethodOpen && (
              <div className="absolute w-full border dark:bg-gray-800 dark:border-gray-700 border-gray-200 mt-1 rounded-md bg-white shadow-lg z-20 max-h-60 overflow-y-auto">
                {methodoptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      setPaymentMethodFilter(opt.value);
                      setPaymentMethodOpen(false);
                      setCurrentPage(1);
                    }}
                    className="px-8 py-2  cursor-pointer hover:bg-gray-100 m-1   dark:hover:bg-gray-700 text-sm"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDownloadAll}
            className="bg-emerald-500 mb-1 min-w-[188px] dark:text-black gap-3 mr-auto text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-600 flex items-center"
          >
            Download All Orders
            <IoCloudDownloadOutline className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-[18px] md:gap-4 lg:gap-6 pb-8 items-end dark:bg-gray-800">
          <div className="flex flex-col">
            <label className="text-sm text-black dark:text-white mb-[2px]">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="border flex border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2 text-sm w-full focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-black dark:text-white mb-[2px]">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              min={startDate}
              className="border flex border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2 text-sm w-full focus:outline-none"
            />
          </div>

          <div className="flex gap-2 xl:gap-5 pl-1 pb-[1px] xl:pb-0 w-full pt-5 md:pt-0">
            <button className="bg-[#10b77f] dark:bg-[#10b77f] cursor-pointer w-full dark:text-black text-white xl:px-4 py-[9px] text-sm rounded-md hover:bg-[#11a978] transition dark:hover:bg-[#11a978]">
              Filter
            </button>
            <button
              onClick={handleReset}
              className="border-0.5 cursor-pointer bg-gray-100 border w-full border-gray-200 xl:px-4 py-[9px] rounded-md hover:bg-white text-sm transition dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-800"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border-[1px] border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left text-black dark:text-white">
            <tr>
              <th className="px-3 text-xs font-bold  py-1">INVOICE NO</th>
              <th className="px-3 text-xs font-bold py-1">ORDER TIME</th>
              <th className="px-3  lg:py-3 text-xs  font-bold py-1">
                CUSTOMER NAME
              </th>
              <th className="pl-[6px]  pr-3 text-xs font-bold py-1">METHOD</th>
              <th className="px-3 text-xs font-bold py-1">AMOUNT</th>
              <th className="px-3 text-xs font-bold py-1">STATUS</th>
              <th className="px-3 text-xs font-bold py-1">ACTION</th>
              <th className="px-3 text-xs font-bold text-end py-1">INVOICE</th>
            </tr>
          </thead>

          <tbody className="dark:bg-gray-900">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-3 py-[11px]  font-semibold text-xs text-gray-800 dark:text-gray-100">
                    {order.invoiceNo}
                  </td>
                  <td className="px-3 text-gray-900 dark:text-gray-100">
                    {order.orderTime}
                  </td>
                  <td className="px-3 text-gray-900 dark:text-gray-100">
                    {order.customerName}
                  </td>
                  <td className="pl-[6px]  pr-3 font-semibold text-gray-800 dark:text-gray-100">
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

                  <td className="px-3 pr-5">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className=" w-full min-w-[110px]  appearance-none flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md px-3 py-[5px] text-sm font-medium"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xl " />
                    </div>
                  </td>

                  <td className="py-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-end gap-[18px] px-5">
                      <SlPrinter
                        onClick={() => handlePrint(order)}
                        className="cursor-pointer hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-bold text-[18px]"
                      />
                      <HiOutlineMagnifyingGlassPlus
                        onClick={() => handleViewDetails(order)}
                        className="cursor-pointer text-gray-500 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white text-[20px]"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-3 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No orders found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 py-2">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
