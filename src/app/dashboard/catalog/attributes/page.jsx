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

export default function Attributes() {
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
        <h1 className="text-[23px] font-bold text-gray-800 dark:text-gray-300">Attributes</h1>

        <div className="flex flex-col sm:flex-row gap-2 items-center pt-4 sm:pt-0">
          <div
            className="relative mr-auto sm:mr-0 flex items-center gap-1.5"
            ref={dropdownRef}
          >
            <button
              onClick={() => {
                setOpenExport((prev) => !prev);
                setShowImport(false);
              }}
              className="gap-1 items-center cursor-pointer  bg-gray-100 hover:bg-white border  border-gray-200 flex px-3 py-2 rounded-md transition dark:text-white dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-800"
            >
              <MdOutlineFileUpload className="my-auto text-xs xl:text-sm text-gray-400" />
              <p className="text-xs">Export</p>
            </button>

            {openExport && (
              <div className="absolute left-0 top-0 mt-9 w-56 text-sm  bg-white  text-gray-400 border border-gray-200 rounded-md shadow-lg z-10 dark:bg-gray-800  dark:border-gray-800  ">
                <button
                  onClick={() => handleExport("CSV")}
                  className="w-full cursor-pointer flex gap-3 px-4 py-2 text-sm mb-1 font-semibold hover:bg-gray-200 hover:text-green-500 duration-200 dark:hover:bg-gray-800 dark:hover:text-white "
                >
                  <FaRegFileAlt /> <p>Export to CSV</p>
                </button>
                <button
                  onClick={() => handleExport("JSON")}
                  className="w-full cursor-pointer flex gap-3 px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-green-500 duration-200 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <FaRegFileCode /> <p>Export to JSON</p>
                </button>
              </div>
            )}

            {!showImport && (
              <button
                onClick={() => {
                  setShowImport(true);
                  setOpenExport(false);
                }}
                className="gap-1 cursor-pointer hover:bg-white bg-gray-100 border border-gray-200 flex px-3 py-2 rounded-md transition dark:text-white dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-800"
              >
                <MdOutlineFileDownload className="my-auto text-xs xl:text-sm text-gray-400" />
                <p className="text-xs">Import</p>
              </button>
            )}

            {showImport && (
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowImport(false)}
                  className="px-3 py-2 flex gap-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition  dark:text-white dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-800"
                >
                  <MdOutlineFileDownload className="my-auto text-xs xl:text-sm text-gray-400 " />
                  <p className="text-xs">Import</p>
                </button>
                <label className="cursor-pointer border border-dashed border-green-500 rounded-md px-3 py-2 text-xs text-black whitespace-nowrap dark:text-gray-400">
                  Select Your JSON Products File
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleImportNow}
                  className="gap-1 cursor-pointer bg-[#0ea5e9] dark:bg-[#0284c7] dark:hover:bg-[#0369a1] text-white flex px-4 text-sm py-2 rounded-md transition whitespace-nowrap"
                >
                  <p className="px-1 my-auto">
                    <FiPlus />
                  </p>
                  Import Now
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Bulkactionattributes disabled={selectedProducts.length === 0} />
            <Deleteattributes disabled={selectedProducts.length === 0} />
            <AddattributesButton />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Tableattributes
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
