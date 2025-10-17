"use client";
import { useState, useEffect, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { FiX, FiUploadCloud } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function AddstaffButton() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState("Staff role");
  const [routesOpen, setRoutesOpen] = useState(false);
  const routesRef = useRef(null);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const roles = [
    "Silver Admin",
    "Admin",
    "Accountant",
    "Security",
    "Guard",
    "Delivery",
    "Person",
  ];
  const routes = [
    "Dashboard",
    "Products",
    "Categories",
    "Attributes",
    "Coupons",
    "Orders",
    "Customers",
    "Reports",
  ];
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
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleOpen(false);
      }
      if (routesRef.current && !routesRef.current.contains(event.target)) {
        setRoutesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const toggleRoute = (route) => {
    if (selectedRoutes.includes(route)) {
      setSelectedRoutes(selectedRoutes.filter((r) => r !== route));
    } else {
      setSelectedRoutes([...selectedRoutes, route]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRoutes.length === routes.length) {
      setSelectedRoutes([]);
    } else {
      setSelectedRoutes([...routes]);
    }
  };

  const filteredRoutes = routes.filter((r) =>
    r.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="gap-2 cursor-pointer w-full  justify-center bg-[#14b8a6] px-4 py-2 text-white flex rounded-md hover:bg-teal-600 transition dark:bg-[#0d9488] dark:hover:bg-[#0f766e]"
      >
        <MdAdd className="my-auto" />
        <p className="text-sm my-auto flex gap-1 ">
          <span>Add</span>
          <span>Staff</span>
        </p>
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
        <div className="w-full bg-[#f9fafb] border-b dark:border-gray-700 border-gray-100 dark:bg-gray-800 px-6 py-6">
          <div className="md:flex justify-between mr-20">
            <div>
              <h2 className="text-xl">Add Staff</h2>
              <p className="text-black dark:text-white text-sm">
                Add your staff necessary information from here
              </p>
            </div>
            <div className="flex gap-10">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="border text-sm border-green-500 rounded-md px-2 pr-8 dark:bg-gray-700 bg-gray-100 h-8 focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-3 fixed top-6 right-6 rounded-full cursor-pointer text-end bg-white text-red-600 hover:bg-red-100 hover:text-black shadow-md"
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6  overflow-y-auto dark:bg-gray-950 h-[calc(100%-80px)]">
          <div className="p-6">
            <div className="sm:flex pt-8 mb-[10px]">
              <label className="block pb-3 sm:pb-0 text-sm font-medium">
                Staff Image
              </label>
              <div className="mb-2 w-full sm:w-[66%] ml-auto border-2 dark:border-gray-600 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-5 text-center cursor-pointer hover:border-teal-500 transition">
                <p className="px-2 pb-2 text-3xl text-green-600">
                  <FiUploadCloud />
                </p>
                <p className="text-sm">Drag your images here</p>
                <p className="text-gray-400 text-xs my-1 pb-1">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </div>
            </div>
            <div className="mt-8">
              {[
                "Name",
                "Email",
                "Password",
                "Phone Number",
                "Joining Date",
              ].map((field, i) => (
                <div key={i} className={`sm:flex ${i % 2 !== 0 ? "py-6" : ""}`}>
                  <label className="block text-sm pb-3 sm:pb-0">{field}</label>
                  <input
                    type={
                      field === "text"
                        ? "staff name"
                        : field === "Email"
                        ? "email"
                        : field === "Password"
                        ? "password"
                        : field === "Joining Date"
                        ? "date"
                        : field === "Phone Number"
                        ? "number"
                        : "text"
                    }
                    placeholder={field}
                    className="w-full sm:w-[66%] flex ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="sm:flex items-start py-6" ref={roleRef}>
              <label className="block  text-sm pb-3 sm:pb-0 sm:mr-4">
                Staff Role
              </label>
              <div className="w-full sm:w-[66%] ml-auto relative">
                <div
                  className="border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-2 sm:py-[9px] text-sm cursor-pointer flex justify-between items-center"
                  onClick={() => setRoleOpen(!roleOpen)}
                >
                  {selectedRole}
                  <RiArrowDownSLine className="ml-2" />
                </div>
                {roleOpen && (
                  <ul className="absolute bottom-0 mb-11 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-500 rounded-md shadow-lg z-10 overflow-auto">
                    {roles.map((role) => (
                      <li
                        key={role}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedRole(role);
                          setRoleOpen(false);
                        }}
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="md:flex justify-between" ref={routesRef}>
              <label className="block text-sm pb-2">
                Select Routes to given Access
              </label>
              <div
                className="border w-[66%] rounded-md  px-3 py-2 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-600 cursor-pointer flex justify-between items-center"
                onClick={() => setRoutesOpen(!routesOpen)}
              >
                {selectedRoutes.length > 0
                  ? selectedRoutes.join(", ")
                  : "Select..."}
                <span className="ml-2">
                  <RiArrowDownSLine />
                </span>
              </div>

              {routesOpen && (
                <div className="absolute mt-10 w-[60%] right-10   bg-white border border-gray-200 dark:bg-gray-700 rounded-md shadow-lg z-10 max-h-[200px] overflow-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full  mb-2 text-sm dark:bg-gray-700 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div
                      className="flex items-center px-2 py-1 hover:bg-gray-100 dark:bg-gray-700 cursor-pointer"
                      onClick={toggleSelectAll}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRoutes.length === routes.length}
                        readOnly
                        className="mr-2"
                      />
                      Select All
                    </div>
                    {filteredRoutes.map((route) => (
                      <div
                        key={route}
                        className="flex items-center px-2 py-1 dark:bg-gray-700 hover:bg-gray-500 cursor-pointer"
                        onClick={() => toggleRoute(route)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoutes.includes(route)}
                          readOnly
                          className="mr-2"
                        />
                        {route}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6 px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer py-[9px] sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white rounded-md hover:bg-teal-600 dark:text-black">
            Add Staff
          </button>
        </footer>
      </div>
    </div>
  );
}
