"use client";
import { useState, useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi2";
import languageData from "@/app/data/languages.json";

export default function AddLanguageButton({
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasVariants, setHasVariants] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLanguages = languageData.filter((lang) =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <button
        onClick={() => setSidebarOpen(true)}
        className="gap-1 cursor-pointer w-full justify-center bg-[#14b8a6] px-4 py-2 text-white flex rounded-md hover:bg-teal-600 transition dark:bg-[#0d9488] dark:hover:bg-[#0f766e]"
      >
        <MdAdd className="my-auto" />
        <p className="text-sm my-auto flex gap-1">
          <span>Add</span>
          <span>language</span>
        </p>
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[9998]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[50%] bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full bg-[#f9fafb] border-b dark:bg-gray-800 border-gray-100 dark:border-gray-700 px-6 py-6 relative">
          <h2 className="text-xl dark:text-gray-300">Add Language</h2>
          <p className="text-black dark:text-gray-300 max-w-[200px] sm:max-w-[300px] lg:max-w-max text-sm">
            Add your Language necessary information from here
          </p>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-3 absolute top-6 right-6 rounded-full cursor-pointer bg-white text-red-600 hover:bg-red-100 hover:text-black shadow-md"
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6 pb-10 overflow-y-auto dark:bg-gray-700 h-[calc(100%-80px)]">
          <div className="sm:flex pt-6 relative" ref={dropdownRef}>
            <label className="block text-sm pb-3 sm:pb-0 sm:mr-4">
              Select Language
            </label>
            <div className="w-full sm:w-[66%] ml-auto relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full text-left border dark:bg-gray-800 dark:border-gray-800 border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-[1px] focus:ring-blue-400 text-sm flex justify-between items-center"
              >
                {selectedLanguage ? selectedLanguage.name : "Select language"}
                <HiOutlineChevronDown className="ml-2 text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <ul>
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((lang) => (
                        <li
                          key={lang.id}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setDropdownOpen(false);
                            setSearch("");
                          }}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-600 dark:text-white"
                        >
                          {lang.name} ({lang.isoCode})
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-sm text-gray-400">
                        No languages found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="sm:flex pt-6">
            <label className="block text-sm pb-3 sm:pb-0">Name</label>
            <input
              type="text"
              className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-[1px] focus:ring-blue-400 text-sm"
              placeholder="Language name"
            />
          </div>

          <div className="sm:flex pt-6">
            <label className="block text-sm pb-3 sm:pb-0">Flag</label>
            <input
              type="text"
              className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-[1px] focus:ring-blue-400 text-sm"
              placeholder="Emoji or URL"
            />
          </div>

          <div className="sm:flex pt-3 sm:pt-6">
            <label className="block text-sm pb-3 sm:pb-0">Published</label>
            <div className="sm:flex w-full sm:w-[66%] ml-auto text-sm">
              <button
                onClick={() => setHasVariants(!hasVariants)}
                className={`relative flex items-center w-20 h-[30px] rounded-full transition-colors duration-300 ${
                  hasVariants ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    hasVariants ? "translate-x-[49px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto text-white">
                  {hasVariants ? "Yes" : "No"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <footer className="flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6 px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setSidebarOpen(false)}
            className="cursor-pointer py-[9px] sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white rounded-md hover:bg-teal-600 dark:text-black">
            Add Language
          </button>
        </footer>
      </div>
    </div>
  );
}
