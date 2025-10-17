"use client";
import { useState, useRef, useEffect } from "react";
import Toast from "@/app/(marketing)/components/Toast";
import Tablecustomers from "@/app/components/Table-customers/page";
import Tableorder from "@/app/components/Table-orders/page";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openExport, setOpenExport] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenExport(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" bg-[#f8f7f4]  dark:bg-gray-900  max-w-[1350px] mx-auto pb-4 ">
      <h1 className="text-[23px] py-7  mb-3 lg:mb-0 font-bold text-gray-800 dark:text-gray-300">
        Orders
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Tableorder
          itemsPerPage={1}
          currentPage={currentPage}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>

      <Toast
        show={showToast}
        message="This feature is disabled for demo!"
        type="error"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
