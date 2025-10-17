"use client";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";

export default function AddCategoryButton() {
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
          className="gap-3 cursor-pointer w-full  justify-center bg-[#14b8a6] px-4 py-2 text-white flex rounded-md hover:bg-teal-600 transition dark:bg-[#0d9488] dark:hover:bg-[#0f766e]"
        >
          <MdAdd className="my-auto" />
          <p className="text-sm my-auto flex gap-1 ">
            <span>Add</span>
            <span> Category</span>
          </p>
        </button>

        {open && (
          <div
            className="fixed inset-0 bg-black/30 z-[9998]"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[50%]  bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className=" w-full bg-[#f9fafb] border-b-1 dark:bg-gray-800 border-gray-100 px-6 py-6">
            <div className="md:flex   justify-between mr-20">
              <div>
                <h2 className="text-xl ">Add Category</h2>
                <p className="text-bleck text-sm">
                  Add your Product category and necessary information from here{" "}
                </p>
              </div>
              <div className="flex gap-10">
                <div className="">
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="border text-sm   border-green-500 rounded-md flex px-2 pr-8 dark:bg-gray-700 bg-gray-100 h-8  focus:outline-none"
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
              className="p-3 fixed top-6 right-6 rounded-full cursor-pointer text-end   bg-white text-red-600  hover:bg-red-100 hover:text-black shadow-md  "
            >
              <FiX size={15} />
            </button>
          </div>

          <div className="px-6 pb-10 overflow-y-auto dark:bg-gray-700 h-[calc(100%-80px)] ">
            <div>
              <div className="sm:flex  pt-6 ">
                <label className="block  text-sm  pb-3 sm:pb-0 ">Name</label>
                <input
                  type="text"
                  className=" w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2 sm:py-[9px]  focus:outline-none  focus:ring-teal-500 text-sm"
                  placeholder="Category title"
                />
              </div>

              <div className="sm:flex py-6">
                <label className="block  text-sm pb-3 sm:pb-0 font-medium">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200  rounded-md px-3 py-2  sm:py-[9px] focus:outline-none 1  text-sm"
                  placeholder="Category Description"
                ></textarea>
              </div>
              <div className="sm:flex py-6">
                <label className="block  text-sm pb-3 sm:pb-0">
                  Parent Category
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2  sm:py-[9px] focus:outline-none  text-sm"
                  placeholder="Select Category"
                />
              </div>
              <div className=" sm:flex">
                <label className="block pb-3 sm:pb-0 text-sm font-medium">
                  Category Image
                </label>
                <div className="mb-2   w-full sm:w-[66%] ml-auto border-2 dark:border-gray-600  border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-5 text-center cursor-pointer hover:border-teal-500 transition">
                  <p className="px-2 pb-2  text-3xl text-green-600">
                    <FiUploadCloud />
                  </p>

                  <p className="text-sm ">Drag your images here</p>
                  <p className="text-gray-400 text-xs my-1 pb-1">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </p>
                </div>
              </div>

              <div className="sm:flex  pt-6 sm:pt-8 ">
                <label className="block  text-sm  pb-3 sm:pb-0 ">
                  Published
                </label>
                <div className="sm:flex  w-full sm:w-[66%] ml-auto  text-sm">
                  <button
                    onClick={() => setHasVariants(!hasVariants)}
                    className={`relative  flex items-center w-20 h-[30px] rounded-full transition-colors duration-300 ${
                      hasVariants ? "bg-green-700" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`absolute  left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        hasVariants ? "translate-x-[49px]" : "translate-x-0"
                      }`}
                    />
                    <span className="text-sm  mr-2 ml-auto">
                      {hasVariants ? (
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

          <footer className=" flex sm:flex-row  flex-col justify-center gap-3 sm:gap-4 lg:gap-6   px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer py-[9px] sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Cancel
            </button>
            <button className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white rounded-md hover:bg-teal-600 dark:text-black">
              Add Category
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
