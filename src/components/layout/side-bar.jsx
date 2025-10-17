"use client";
import { usePathname } from "next/navigation";
import { TbMinus } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PiSquaresFour } from "react-icons/pi";
import { IoExitOutline } from "react-icons/io5";
import { FiUser, FiSlack, FiTarget } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { LiaBandcamp } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";
import { RiGlobalLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export default function Sidebar({ open }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({
    Catalog: false,
    International: false,
    OnlineStore: false,
    Pages: false,
  });

  const handleToggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full dark:bg-gray-800 bg-white z-40 transition-all duration-300 ease-in-out flex flex-col overflow-hidden
        ${open ? "w-64" : "w-0"} hidden lg:flex`}
    >
      {/* Logo */}
      <div
        className={`py-4 px-3 font-bold text-xl text-green-600 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/assets/download.svg"
          className="h-[32px] w-[135px] cursor-pointer"
          onClick={() => handleNavigate("/")}
        />
      </div>

      <div className="overflow-y-auto scrollbar-hide">
        <ul className="mt-[14px] ">
          {/* Dashboard */}

          <li
            onClick={() => handleNavigate("/dashboard")}
            className={`border-l-4  p-4 flex items-center cursor-pointer transition-colors duration-200
          ${
            pathname === "/dashboard"
              ? "border-[#10b981] text-[#059669]"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
          }`}
          >
            <PiSquaresFour className="h-6 w-6 ml-1" />
            <span
              className={`ml-3 font-semibold text-sm transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Dashboard
            </span>
          </li>

          {/* Catalog */}

          <li
            className={`border-l-4 px-4 py-3 items-center cursor-pointer transition-colors duration-200 ${
              pathname.startsWith("/dashboard/catalog")
                ? "border-[#10b981] text-gray-500 dark:text-gray-400 "
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <div
              className="flex text-inherit dark:text-inherit cursor-pointer"
              onClick={() => handleToggleMenu("Catalog")}
            >
              <div className="flex">
                <FiSlack className="h-5 w-5 ml-1" />
                <span
                  className={`ml-4 mt-[2px] font-semibold text-sm transition-all duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Catalog
                </span>
              </div>
              {open && (
                <span className="mr-auto text-xl pt-[1px] ml-3 my-auto">
                  {openMenus.Catalog ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              )}
            </div>

            {openMenus.Catalog && open && (
              <ul className="rounded-lg my-1 space-y-[7px] mr-2 py-3 px-2 ml-1 dark:bg-gray-900">
                {[
                  { name: "Products", path: "/dashboard/catalog/products" },
                  { name: "Categories", path: "/dashboard/catalog/categories" },
                  { name: "Attributes", path: "/dashboard/catalog/attributes" },
                  { name: "Coupons", path: "/dashboard/catalog/coupons" },
                ].map((item) => (
                  <li
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={`cursor-pointer font-normal flex items-center transition-colors duration-200 ${
                      pathname === item.path
                        ? "border-[#10b981] text-gray-500  "
                        : "text-gray-500 hover:text-[#059669] dark:hover:text-white"
                    }`}
                  >
                    <TbMinus className="w-3" />
                    <p className="text-[14px] font-normal ml-1">{item.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Customers */}

          <li
            onClick={() => handleNavigate("/dashboard/customers")}
            className={`border-l-4 flex cursor-pointer px-4 py-5 items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/customers")
                ? "border-[#10b981] text-[#059669]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <LuUsers className="w-[21px] h-[21px] ml-1" />
            <span
              className={`ml-[15px] text-sm font-semibold transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Customers
            </span>
          </li>

          {/* Orders */}

          <li
            onClick={() => handleNavigate("/dashboard/orders")}
            className={`border-l-4 flex cursor-pointer px-4 py-[11px] items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/orders")
                ? "border-[#10b981] text-[#059669]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <LiaBandcamp className="w-[22px] h-[22px] ml-1" />
            <span
              className={`ml-[15px] text-sm font-semibold transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Orders
            </span>
          </li>

          {/* Our Staff */}

          <li
            onClick={() => handleNavigate("/dashboard/allstaff")}
            className={`border-l-4 flex cursor-pointer px-4 py-5 items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/allstaff")
                ? "border-[#10b981] text-[#059669]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <FiUser className="w-5 h-5 ml-1" />
            <span
              className={`ml-4 text-sm font-semibold transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Our Staff
            </span>
          </li>

          {/* Settings */}

          <li
            onClick={() => handleNavigate("/dashboard/setting")}
            className={`border-l-4 flex cursor-pointer px-4 py-[10px] items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/setting")
                ? "border-[#10b981] text-[#059669]"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <TbSettings className="w-6 h-6 ml-1" />
            <span
              className={`ml-3 text-sm font-semibold transition-all duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </span>
          </li>

          {/* International */}

          <li
            className={`border-l-4 cursor-pointer px-4 py-[18px] items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/international")
                ? "border-[#10b981] text-gray-500 dark:text-gray-400 "
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <div
              className="flex items-center dark:text-inherit text-inherit"
              onClick={() => handleToggleMenu("International")}
            >
              <div className="flex items-end">
                <RiGlobalLine className="h-[22px] w-[22px] ml-1" />
                <span
                  className={`ml-[14px] text-sm font-semibold transition-all duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  International
                </span>
              </div>
              {open && (
                <span className="ml-3 text-xl pt-[1px]">
                  {openMenus.International ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              )}
            </div>

            {openMenus.International && open && (
              <ul className="rounded-lg my-1 space-y-[6px] mr-2 py-[11px] px-2 ml-1 dark:bg-gray-900">
                {[
                  {
                    name: "Languages",
                    path: "/dashboard/international/languages",
                  },
                  {
                    name: "Currencies",
                    path: "/dashboard/international/currencies",
                  },
                ].map((item) => (
                  <li
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={`cursor-pointer font-normal flex items-center transition-colors duration-200 ${
                      pathname === item.path
                        ? "border-[#10b981] text-gray-500"
                        : "text-gray-500 hover:text-[#059669] dark:hover:text-white"
                    }`}
                  >
                    <TbMinus className="w-3" />
                    <p className="text-[15px] ml-1">{item.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Online Store */}

          <li
            className={`border-l-4 cursor-pointer px-4 py-3 items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/onlinestore") ||
              pathname.startsWith("/dashboard/store")
                ? "border-[#10b981] text-gray-500 dark:text-gray-400 "
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <div
              className="flex items-center text-inherit dark:text-inherit"
              onClick={() => handleToggleMenu("OnlineStore")}
            >
              <div className="flex">
                <FiTarget className="h-5 w-5 ml-1" />
                <span
                  className={`ml-4 text-sm mt-[2px] font-semibold transition-all duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Online Store
                </span>
              </div>
              {open && (
                <span className="ml-3 text-xl pt-[1px]">
                  {openMenus.OnlineStore ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              )}
            </div>

            {openMenus.OnlineStore && open && (
              <ul className="rounded-lg my-1 space-y-[6px] mr-2 py-[11px] px-2 ml-1 dark:bg-gray-900">
                {[
                  {
                    name: "View Store",
                    path: "https://kachabazar-store-nine.vercel.app/",
                  },
                  {
                    name: "Store Customization",
                    path: "/dashboard/store/customization",
                  },
                  {
                    name: "Store Settings",
                    path: "/dashboard/onlinestore/storesettings",
                  },
                ].map((item) => (
                  <li
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={`cursor-pointer font-normal flex items-center transition-colors duration-200 ${
                      pathname === item.path
                        ? "border-[#10b981] text-gray-500  "
                        : "text-gray-500 hover:text-[#059669] dark:hover:text-white"
                    }`}
                  >
                    <TbMinus className="w-3" />
                    <p className="text-[15px] ml-1">{item.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Pages */}

          <li
            className={`border-l-4 cursor-pointer px-4 py-5 items-center transition-colors duration-200 ${
              pathname.startsWith("/dashboard/pages")
                ? "border-[#10b981] text-gray-500"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#059669] dark:hover:text-white"
            }`}
          >
            <div
              className="flex items-center text-inherit dark:text-inherit"
              onClick={() => handleToggleMenu("Pages")}
            >
              <div className="flex">
                <FiSlack className="w-5 h-5 ml-1" />
                <span
                  className={`ml-4 text-sm mt-[2px] font-semibold transition-all duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Pages
                </span>
              </div>
              {open && (
                <span className="ml-3 text-xl pt-[1px]">
                  {openMenus.Pages ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              )}
            </div>

            {openMenus.Pages && open && (
              <ul className="rounded-lg my-1 space-y-[6px] mr-2 py-[11px] px-2 ml-1 dark:bg-gray-900">
                <li
                  onClick={() => handleNavigate("/dashboard/pages/comingsoon")}
                  className={`cursor-pointer font-normal flex items-center transition-colors duration-200 ${
                    pathname === "/dashboard/pages/comingsoon"
                      ? "border-[#10b981] text-gray-500  "
                      : "text-gray-500 hover:text-[#059669] dark:hover:text-white"
                  }`}
                >
                  <TbMinus className="w-3" />
                  <p className="text-[15px] ml-1">Coming Soon</p>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div className="px-6 mb-6 mt-auto">
        <button
          onClick={() => handleNavigate("/")}
          className="cursor-pointer justify-center gap-3 flex mx-auto bg-[#14b8a6] dark:bg-[#0d9488] text-sm text-white w-full py-2.5 rounded-md hover:bg-[#0b857a] transition-colors duration-200"
        >
          <IoExitOutline className="text-[15px] my-auto" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
