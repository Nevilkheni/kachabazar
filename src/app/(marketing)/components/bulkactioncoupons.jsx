"use client";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
export default function Bulkactioncoupon({ disabled, selectedProducts }) {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [hasVariants, setHasVariants] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const handleApplyAction = () => {
    if (!actionType) return alert("Select an action first!");
    console.log(`Applying '${actionType}' to products:`, selectedProducts);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className={`gap-1 justify-center px-4 py-2 flex  text-white  rounded-md transition ${
          disabled
            ? "bg-[#f9b585] cursor-default dark:text-gray-400  dark:bg-[#7e3819]"
            : "bg-[#f97316] hover:bg-[#ea580c]  cursor-pointer dark:bg-[#ea580c] dark:hover:bg-orange-700"
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[50%] bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className=" w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6">
          <div className=" mr-20">
            <h2 className="text-xl ">Update Selected Coupons</h2>
            <p className="text-bleck text-sm">
              Apply changes to the selected Coupons from the list
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-3 fixed top-6 right-6 rounded-full cursor-pointer text-end   bg-white text-red-600  hover:bg-red-100 hover:text-black shadow-md  "
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6 overflow-y-auto h-[calc(100%-160px)] dark:bg-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className=" pt-[9px]">
            <div className="flex flex-col justify-start sm:flex-row pt-6">
              <label className="block text-sm pb-3 sm:pb-0">Start Time</label>

              <div className="w-full sm:w-[66%] ml-auto relative">
                <input
                  type="date"
                  className="w-full border flex border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row py-6">
              <label className="block text-sm pb-3 sm:pb-0">End Time </label>

              <div className="w-full sm:w-[66%] ml-auto relative">
                <input
                  type="date"
                  className="w-full border flex border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full pb-3 ">
              <label className="block  text-sm">Published </label>
              <div className="w-[66%] sm:ml-auto  p-3 sm:p-0">
                <button
                  onClick={() => setHasVariants(!hasVariants)}
                  className={`relative flex items-center  cursor-pointer w-[79px] h-[30px]  rounded-full transition-colors duration-300 ${
                    hasVariants ? "bg-green-700" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`absolute left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      hasVariants ? "translate-x-12" : "translate-x-0"
                    }`}
                  />
                  <span className="text-sm mr-2 ml-auto">
                    {hasVariants ? (
                      <span className="text-white mr-8">Yes</span>
                    ) : (
                      <span className="text-white mr-2">No</span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex flex-col md:flex-row  justify-end gap-4  md:gap-6 px-6 py-4 lg:py-8 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="py-[7px] border 2xl:w-[85%] xl:w-[72%]  lg:w-[65%]  md:w-[50%]  border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800  "
          >
            Cancel
          </button>
          <button
            onClick={handleApplyAction}
            className=" py-2 md:py-[7px] w-full bg-[#10b77f]  text-white rounded-md hover:bg-teal-600 dark:text-black"
          >
            Bulk Update Coupons
          </button>
        </footer>
      </div>
    </>
  );
}
