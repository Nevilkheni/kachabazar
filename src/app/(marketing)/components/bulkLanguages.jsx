"use client";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function BulkLanguagesButton({
  disabled,
  selectedProducts = [],
}) {
  const [open, setOpen] = useState(false);
  const [LaghasVariants, LagsetHasVariants] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const handleApplyAction = () => {
    if (selectedProducts.length === 0) return alert("No products selected!");
    console.log(
      `Applying action to selected products:`,
      selectedProducts,
      "Published:",
      LaghasVariants
    );
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className={`gap-1 justify-center px-4 py-2 flex text-white rounded-md transition ${
          disabled
            ? "bg-[#f9b585] cursor-default dark:text-gray-400 dark:bg-[#7e3819]"
            : "bg-[#f97316] hover:bg-[#ea580c] cursor-pointer dark:bg-[#ea580c] dark:hover:bg-orange-700"
        }`}
      >
        <FaRegEdit className="my-auto" />
        <p className="text-sm my-auto">Bulk Action</p>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-[9998]"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[50%] bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6 relative ">
          <h2 className="text-xl dark:text-gray-200 max-w-[200px] lg:max-w-full">
            Update Selected Languages
          </h2>
          <p className="text-black dark:text-gray-300 text-sm max-w-[200px] lg:max-w-full">
            Apply changes to the selected Languages from the list
          </p>
          <button
            onClick={() => setOpen(false)}
            className="p-3 absolute top-6 right-6 rounded-full cursor-pointer bg-white text-red-600 hover:bg-red-100 hover:text-black shadow-md"
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6 overflow-y-auto h-[calc(100%-160px)] dark:bg-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="sm:flex w-full py-8 sm:pb-3 items-start ">
            <label className="block text-sm">Published </label>
            <div className="w-[66%] sm:ml-auto p-3 sm:p-0">
              <button
                onClick={() => LagsetHasVariants(!LaghasVariants)}
                className={`relative flex items-center cursor-pointer ml-0.5 w-[79px] h-[30px] rounded-full transition-colors duration-300 ${
                  LaghasVariants ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    LaghasVariants ? "translate-x-[49px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm  mr-2 ml-auto">
                  {LaghasVariants ? (
                    <span className="text-white mr-8 ">Yes</span>
                  ) : (
                    <span className="text-white mr-2">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <footer className="flex flex-col md:flex-row justify-end gap-4 md:gap-6 px-6 py-4 lg:py-8 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="py-[7px] border 2xl:w-[85%] xl:w-[72%] lg:w-[65%] md:w-[50%] border-gray-200 dark:border-gray-800 w-full rounded-md hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-800 bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyAction}
            className="py-2 md:py-[7px] w-full bg-[#10b77f] text-white dark:text-black rounded-md hover:bg-teal-600"
          >
            Bulk Update Languages
          </button>
        </footer>
      </div>
    </>
  );
}
