"use client";
import { useState, useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMoon, FiSun } from "react-icons/fi";
import Sidebar from "../side-bar";
import MobilSidebar from "../mobil-sidebar";
import { PiSquaresFour } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { MdOutlineLogout } from "react-icons/md";

export default function MainHeader({ children }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const profileRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const languages = [
    { code: "IN", name: "தமிழ்" },
    { code: "TR", name: "Türkçe" },
    { code: "IN", name: "हिन्दी" },
    { code: "ES", name: "Español" },
    { code: "PT", name: "Português" },
    { code: "FR", name: "Français" },
    { code: "JP", name: "日本語" },
    { code: "CN", name: "中文" },
    { code: "SA", name: "العربية" },
    { code: "GB", name: "English" },
  ];

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ? true : false;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`${isDark ? "dark" : ""} min-h-screen`}>
      <Sidebar open={sidebarOpen} />
      <MobilSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div
        className={`flex-1 transition-all  duration-300 bg-[#f8f7f4] h-full dark:bg-gray-900 ${
          sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <nav className="px-6 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
          <div className="flex justify-between h-14 max-w-[1350px] mx-auto">
            <button
              onClick={toggleSidebar}
              className="text-[#11a978] text-3xl lg:text-[22px]"
            >
              <BiMenu />
            </button>

            <div className="flex justify-center gap-6">
              <div
                className="relative flex cursor-pointer select-none"
                onMouseEnter={() => setOpenLanguage(true)}
                onMouseLeave={() => setOpenLanguage(false)}
              >
                <div className="flex items-center">
                  <p className="text-gray-600 dark:text-gray-300 text-[9px] px-1 font-bold dark:hidden">
                    GB
                  </p>
                  <span className="hidden md:flex items-center mb-1.5 text-[14px] text-gray-800 dark:text-gray-200">
                    ENGLISH
                  </span>
                  <span className="flex md:hidden items-center mb-1.5 text-[14px] text-gray-800 dark:text-gray-200">
                    EN
                  </span>
                </div>

                {openLanguage && (
                  <div className="absolute mt-9 left-0 w-44 bg-white  border border-gray-100  shadow-md py-2 text-sm z-50">
                    {languages.map((lang, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-100  rounded-md transition-all duration-150 cursor-pointer"
                      >
                        <span className="text-green-600 text-xs w-6">
                          {lang.code}
                        </span>
                        <span className="text-gray-800 dark:text-black">
                          {lang.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="my-auto">
                {isDark ? (
                  <FiSun
                    className="text-[#11a978] h-5 w-6 cursor-pointer"
                    onClick={() => setIsDark(false)}
                  />
                ) : (
                  <FiMoon
                    className="text-[#11a978] h-5 w-6 cursor-pointer"
                    onClick={() => setIsDark(true)}
                  />
                )}
              </div>

              <div className="relative my-auto">
                <IoMdNotificationsOutline className="text-[#148e6b] h-5.5 w-5.5 font-bold cursor-pointer" />
                <span className="absolute -top-2 right-2 bg-red-500 text-white text-[10.5px] px-1 py-0.5 rounded-full">
                  10
                </span>
              </div>

              {/* Profile */}
              <div className="relative my-auto pb-2" ref={profileRef}>
                <img
                  src="/assets/9.png"
                  className="cursor-pointer h-[32px] w-[32px] rounded-full"
                  alt="Profile"
                  onClick={() => setOpenProfile((prev) => !prev)}
                />
                {openProfile && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg text-sm z-50 transition-colors duration-300">
                    <div className="items-center text-[14px] cursor-pointer">
                      <a
                        href="/dashboard"
                        className="flex gap-2 text-gray-500 dark:text-gray-200 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#2cb55f] rounded-md duration-300"
                      >
                        <PiSquaresFour className="text-lg" />
                        Dashboard
                      </a>
                      <a className="flex gap-2 text-gray-500 dark:text-gray-200 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md duration-300">
                        <SlSettings className="text-lg" />
                        Edit Profile
                      </a>
                      <a
                        href="/auth/sign-in"
                        className="flex gap-2 text-gray-500 dark:text-gray-200 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#2cb55f] rounded-md duration-300"
                      >
                        <MdOutlineLogout className="text-lg" />
                        Log Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="lg:px-6 sm:px-4 px-2 text-gray-800 dark:text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}
