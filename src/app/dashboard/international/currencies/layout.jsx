"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { FaRegFileCode, FaRegFileAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Tableattributes from "@/app/components/Table-attributes/page";
import Toast from "@/app/(marketing)/components/Toast";
import AddattributesButton from "@/app/(marketing)/components/addtoattributes";
import Deleteattributes from "@/app/(marketing)/components/deleteattributes";
import Bulkactionattributes from "@/app/(marketing)/components/bulkattributes";
import AddCurrencieButton from "@/app/(marketing)/components/addtoCurrency";
import UpdateCurrenciesButton from "@/app/(marketing)/components/bulkactionCurrencies";
import BulkCurrenciesButton from "@/app/(marketing)/components/bulkactionCurrencies";

export default function Currencieslayout({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openExport, setOpenExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const dropdownRef = useRef(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImportNow = () => {
    setShowToast(true);
    setShowImport(false);
    setFile(null);
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
    setOpenExport(false);
  };

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
      <div className="sm:flex sm:flex-col lg:flex-row justify-between items-start lg:items-center sm:gap-3 lg:gap-4 lg:py-8 py-3">
        <h1 className="text-[23px] font-bold text-gray-800 dark:text-gray-300">
          Currencies
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center pt-4 sm:pt-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <BulkCurrenciesButton/>
            <Deleteattributes />
            <AddCurrencieButton />
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
