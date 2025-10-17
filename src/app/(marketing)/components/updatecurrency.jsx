"use client";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function UpdateCurrencyButton({
  open: externalOpen,
  setOpen: externalSetOpen,
  product,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen =
    externalSetOpen !== undefined ? externalSetOpen : setInternalOpen;

  const [currencyEnabled, setCurrencyEnabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || "",
        symbol: product?.symbol || "",
      });
      setCurrencyEnabled(!!product?.enabled);
    }
  }, [product, open]);

  return (
    <>
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
        <div className="w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-normal ">Update Currency</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Updated your currency and necessary information from here
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-3 rounded-full bg-white text-red-600 hover:bg-red-100 hover:text-black shadow-md"
            >
              <FiX size={15} />
            </button>
          </div>
        </div>

        <div className="px-6 py-8 overflow-y-auto dark:bg-gray-700 h-[calc(100%-140px)]">
          <div className="flex flex-col gap-6">
            <div className="sm:flex">
              <label className="block text-sm font-medium w-[30%]">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                placeholder="Enter currency name"
              />
            </div>

            <div className="sm:flex ">
              <label className="block text-sm font-medium w-[30%]">
                Symbol
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, symbol: e.target.value }))
                }
                className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                placeholder="Enter currency symbol"
              />
            </div>

            <div className="sm:flex ">
              <label className="block text-sm font-medium w-[30%]">
                Enabled
              </label>
              <div className="w-[66%] ml-auto">
                <button
                  onClick={() => setCurrencyEnabled(!currencyEnabled)}
                  className={`relative flex items-center cursor-pointer ml-0.5 w-[79px] h-[30px] rounded-full transition-colors duration-300 ${
                    currencyEnabled ? "bg-[#2f855a]" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`absolute left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      currencyEnabled ? "translate-x-[49px]" : "translate-x-0"
                    }`}
                  />

                  <span className="text-sm  mr-2 ml-auto">
                    {currencyEnabled ? (
                      <span className="text-white mr-8 ">Yes</span>
                    ) : (
                      <span className="text-white mr-2">No</span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className=" flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6   px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer py-2.5 sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:hover:text-white dark:border-gray-800 hover:dark:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Updated Product:", {
                ...product,
                ...formData,
                hasVariants,
              });
              setOpen(false);
            }}
            className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white rounded-md hover:bg-teal-600 dark:text-black"
          >
            Update Currency
          </button>
        </footer>
      </div>
    </>
  );
}
