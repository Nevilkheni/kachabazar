

"use client";
import { useState, useRef, useEffect } from "react";
import DeleteProduct from "@/app/(marketing)/components/deleteproduct";
import Toast from "@/app/(marketing)/components/Toast";
import AddLanguagesButton from "@/app/(marketing)/components/addtolanguages";
import BulkLanguagesButton from "@/app/(marketing)/components/bulkLanguages";

export default function Languageslayout({ children }) {
  const [openExport, setOpenExport] = useState(false);
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
    <div className="min-h-screen bg-[#f8f7f4]  dark:bg-gray-900 max-w-[1350px] mx-auto pb-4 ">
      <div className="sm:flex sm:flex-col lg:flex-row justify-between items-start lg:items-center sm:gap-3 lg:gap-4 lg:py-8 py-3 ">
        <h1 className="text-[23px] font-bold text-gray-800 dark:text-gray-300">
          Languages
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center  pt-3 sm:pt-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <BulkLanguagesButton  />
            <DeleteProduct />
            <AddLanguagesButton />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg mt-1 lg:mt-0 shadow overflow-x-auto">
        {children}
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

