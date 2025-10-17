"use client";
import { useState, useRef, useEffect } from "react";

import Toast from "@/app/(marketing)/components/Toast";

export default function StoreSettingslayout({ children }) {
  const [openExport, setOpenExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [file, setFile] = useState(null);
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
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-gray-900 max-w-[1350px] pb-4 mx-auto">
      <div className="text-[23px] font-bold text-gray-800 dark:text-gray-300 sm:flex sm:flex-col lg:flex-row justify-between items-start lg:items-center sm:gap-3 lg:gap-4 lg:py-7 py-3">
        Store Settings
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
