"use client";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";
import { RiArrowDownSFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";


export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [hasVariants, setHasVariants] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const languages = [
    "ta",
    "tr",
    "hi",
    "es",
    "pt",
    "fr",
    "ja",
    "zh",
    "ar",
    "en",
    "bn",
  ];
  const [selected, setSelected] = useState("en");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className="gap-1 cursor-pointer w-full  justify-center bg-[#14b8a6] px-4 py-2 text-white flex rounded-md hover:bg-teal-600 transition dark:bg-[#0d9488] dark:hover:bg-[#0f766e]"
        >
          <MdAdd className="my-auto" />
          <p className="text-sm my-auto">Add Product</p>
        </button>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-[9998]"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[85%]  bg-white  shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className=" w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6">
            <div className="md:flex   justify-between mr-20">
              <div>
                <h2 className="text-xl ">Add Product</h2>
                <p className="text-bleck text-sm">
                  Add your product and necessary information from here
                </p>
              </div>
              <div className="flex gap-10">
                <div className="">
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="border text-sm   border-green-500 rounded-md flex px-2 pr-8 bg-gray-100  dark:bg-gray-700 h-8  focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang}
                        value={lang}
                        className="text-center my-auto"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-3 fixed top-6 right-6 rounded-full cursor-pointer text-end   bg-white  text-red-600  hover:bg-red-100 hover:text-black shadow-md  "
            >
              <FiX size={15} />
            </button>
          </div>
          <div className="flex px-4 border-b-[1px]  border-gray-200 dark:border-gray-600  dark:bg-gray-700 justify-between ">
            <div className="flex space-x-4 ">
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-4  py-2 font-medium border-b-2 transition-all duration-300 ${
                  activeTab === "basic"
                    ? "border-[#10b981] text-[#10b981]"
                    : "border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-600 "
                }`}
              >
                Basic Info
              </button>

              {hasVariants && (
                <button
                  onClick={() => setActiveTab("combination")}
                  className="px-2 py-2  font-medium text-gray-500"
                >
                  Combination
                </button>
              )}
            </div>

            <div className="flex  px-3 items-center space-x-3.5">
              <span className="text-orange-500 hidden md:block text-sm">
                Does this product have variants?
              </span>

              <button
                onClick={() => setHasVariants(!hasVariants)}
                className={`relative flex items-center w-[60px] h-[25px] rounded-full transition-colors duration-300 ${
                  hasVariants ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[23px] h-[23px] bg-white  rounded-full shadow-md transform transition-transform duration-300 ${
                    hasVariants ? "translate-x-[35px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm  mr-2 ml-auto">
                  {hasVariants ? (
                    <span className="text-white mr-5 ">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>

          <div className="px-6 dark:bg-gray-700 pb-10 overflow-y-auto h-[calc(100%-80px)] ">
            <div>
              <div className="sm:flex  pt-8 ">
                <label className="block  text-sm  pb-3 sm:pb-0 ">
                  Product Title/Name
                </label>
                <input
                  type="text"
                  className=" w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3  py-[9px]  focus:outline-none  focus:ring-teal-500 text-sm"
                  placeholder="Product Title/Name"
                />
              </div>
              <div className="sm:flex pt-6 pb-4 sm:pb-6  ">
                <label className="block  text-sm pb-3 sm:pb-0 font-medium">
                  Product Description
                </label>
                <textarea
                  rows="4"
                  className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 bg-[#f3f4f6] dark:bg-gray-800 rounded-md px-3 py-2  focus:outline-none 1  text-sm"
                  placeholder="Product Description"
                ></textarea>
              </div>
              <div className=" sm:flex">
                <label className="block pb-3 sm:pb-0 text-sm font-medium">
                  Product Images
                </label>
                <div className="mb-2   w-full sm:w-[66%] ml-auto border-2  border-dashed  border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center p-5 text-center cursor-pointer hover:border-teal-500 transition">
                  <p className="px-2 pb-2  text-3xl text-green-600">
                    <FiUploadCloud />
                  </p>

                  <p className="text-sm ">Drag your images here</p>
                  <p className="text-gray-400 text-xs my-1 pb-1">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </p>
                </div>
              </div>
              <div className="sm:flex pb-6 pt-8 ">
                <label className="block text-sm pb-3 sm:pb-0">
                  Product SKU{" "}
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3  py-[9px]  focus:outline-none   text-sm"
                  placeholder="Product SKU"
                />
              </div>
              <div className="sm:flex ">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Product Barcode
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3  py-[9px]  focus:outline-none text-sm"
                  placeholder="Product Barcode"
                />
              </div>
              <div className="sm:flex py-6">
                <label className="block  text-sm pb-3 sm:pb-0">Category</label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-300 dark:bg-gray-700 rounded-md px-1  py-[7px]  focus:outline-none  text-md"
                  placeholder="Select Category"
                />
              </div>
             
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 relative">
                <label className="block w-1/2 text-sm">Default Category</label>
                <div className="w-full relative">
                  <select className="w-full border text-gray-400 dark:border-gray-300 dark:bg-gray-700 dark:text-gray-300 border-gray-300 rounded-md py-[6.5px] sm:py-[7px] px-1 appearance-none focus:outline-none ">
                    <option>Default Category</option>
                    <option>No Options Available</option>
                  </select>
                  <span className="pointer-events-none text-2xl absolute right-1.5 top-1/2 transform -translate-y-1/2 text-black">
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </div>
             
              <div className="sm:flex py-6">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Product Price
                </label>
                <div className="flex items-center w-full sm:w-[66%] ml-auto border dark:bg-gray-800 border-gray-300 dark:border-gray-500 dark:text-white rounded-md overflow-hidden">
                  <span className="px-3 text-gray-500 dark:text-white bg-gray-50 dark:bg-gray-700 border-r h-full items-center flex text-sm border-gray-300">
                    $
                  </span>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm dark:bg-gray-800  focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="sm:flex">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Sale Price
                </label>
                <div className="flex items-center w-full sm:w-[66%] ml-auto border  border-gray-300 dark:border-gray-500 rounded-md overflow-hidden">
                  <span className="px-3 text-gray-500 dark:text-white bg-gray-50 dark:bg-gray-700 border-r h-full items-center flex text-sm border-gray-300">
                    $
                  </span>
                  <input
                    type="text"
                    className="w-full px-3 py-2 dark:bg-gray-800 text-sm focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="sm:flex py-6">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Product Quantity
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3  py-[9px]  focus:outline-none  text-sm"
                  placeholder="0"
                />
              </div>
              <div className="sm:flex ">
                <label className="block  text-sm pb-3 sm:pb-0 ">
                  Product Slug
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3  py-[9px]  focus:outline-none  text-sm"
                  placeholder="Product Slug"
                />
              </div>
              <div className="sm:flex py-6 ">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Product Tags
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border bg-gray-100 border-gray-300 dark:border-gray-800 rounded-md px-3  py-[9px]  focus:outline-none  text-sm"
                  placeholder="Product Tag (Write then press enter to add new tag )"
                />
              </div>
            </div>
          </div>

          <footer className=" flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6   px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer py-[9px] sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Cancel
            </button>
            <button className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white dark:text-black rounded-md hover:bg-teal-600">
              Add Product
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
