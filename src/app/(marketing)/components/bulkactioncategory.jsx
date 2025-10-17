"use client";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Bulkactioncategory({ disabled, selectedProducts }) {
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
        className={`gap-3 justify-center px-4 py-2 flex  text-white  rounded-md transition ${
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
        <div className=" w-full bg-[#f9fafb] dark:bg-gray-800  px-6 py-6">
          <div className=" mr-20">
            <h2 className="text-xl ">Update Selected Categories</h2>
            <p className="text-bleck text-sm">
              Apply changes to the selected Categories from the list
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-3 fixed top-6 right-6 rounded-full cursor-pointer text-end   bg-white text-red-600  hover:bg-red-100 hover:text-black shadow-md  "
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6 overflow-y-auto dark:bg-gray-700 h-[calc(100%-160px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row md:py-6 pt-6  ">
              <label className="block  text-sm pb-3 sm:pb-0 font-medium">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800  rounded-md px-3 py-2  focus:outline-none 1  text-sm"
                placeholder="Category Description"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 relative">
              <label className="block w-1/2 text-sm">Parent Category</label>
              <div className="w-full relative">
                <select className="w-full border text-gray-400 dark:border-gray-500 dark:bg-gray-800  border-gray-300 rounded-md py-1.5 px-1 appearance-none focus:outline-none focus:ring-1 focus:ring-teal-500">
                  <option>Home</option>
                  <option>No Options Available</option>
                </select>
                <span className="pointer-events-none text-2xl absolute right-2 top-1/2 transform -translate-y-1/2 text-black">
                  <IoMdArrowDropdown />
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full pb-3 sm:pt-2 ">
              <label className="block  text-sm">Published </label>
              <div className="w-[66%] md:ml-auto p-3 md:p-0">
                <button
                  onClick={() => setHasVariants(!hasVariants)}
                  className={`relative flex items-center  cursor-pointer w-20 h-[30px]  rounded-full transition-colors duration-300 ${
                    hasVariants ? "bg-green-700" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`absolute left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      hasVariants ? "translate-x-[49px]" : "translate-x-0"
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
            Bulk Update Categories
          </button>
        </footer>
      </div>
    </>
  );
}
