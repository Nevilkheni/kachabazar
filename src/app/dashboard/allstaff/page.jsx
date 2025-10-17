"use client";
import { useState, useRef, useEffect } from "react";
import Toast from "@/app/(marketing)/components/Toast";
import AddstaffButton from "@/app/(marketing)/components/addstaff";
import Tableallstaff from "@/app/components/Table-allstaff/page";

export default function allstaff() {
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
    <div className="max-w-[1352px] pb-4 mx-auto">
      <div>
        <div className="flex justify-between py-8">
          <h1 className="text-[23px] font-bold  text-gray-800 dark:text-gray-300">
            All Staff
          </h1>

          <AddstaffButton />
        </div>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Tableallstaff
            itemsPerPage={1}
            currentPage={currentPage}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>
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
