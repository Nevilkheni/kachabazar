"use client";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function SettingsForm() {
  const [allowTranslation, setAllowTranslation] = useState(false);
  const [invoiceEmailEnabled, setInvoiceEmailEnabled] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  const [defaultCurrency, setDefaultCurrency] = useState("Dollar");
  const [defaultTimeZone, setDefaultTimeZone] = useState(
    "Indian/Mayotte (GMT+03:00)"
  );
  const [dateFormat, setDateFormat] = useState("D MMM, YYYY");
  const [receiptWidth, setReceiptWidth] = useState("57 mm");
  const [imagesPerProduct, setImagesPerProduct] = useState(12);
  const languages = ["English", "French", "Spanish", "Hindi"];
  const currencies = ["Dollar", "Euro", "Rupee"];
  const timeZones = ["Indian/Mayotte (GMT+03:00)", "UTC", "GMT+05:30"];
  const dateFormats = ["D MMM, YYYY", "YYYY-MM-DD", "MM/DD/YYYY"];
  const receiptSizes = ["57 mm", "80 mm"];

  return (
    <div>
      <div className="p-4 sm:p-6  mb-6 sm:mb-2 max-w-[1352px] w-full mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
        <div className="flex justify-end items-end">
          <button className="bg-[#0d9488] text-sm text-white px-6 py-[10px]  rounded-md hover:bg-teal-600 transition">
            Update
          </button>
        </div>
        <div className=" sm:p-6">
          <h2 className="text-md font-semibold  ">General Settings</h2>
          <p className="text-sm text-gray-500 my-2 dark:text-gray-400">
            Configure your basic application settings and preferences.
          </p>

          <div className="py-5 md:flex items-center">
            <label className="block text-xs  sm:text-sm dark:text-gray-400 font-semibold">
              Number of images per product
            </label>
            <input
              type="text"
              value={imagesPerProduct}
              onChange={(e) => setImagesPerProduct(e.target.value)}
              className="ml-auto  mt-6 sm:mt-0  w-full sm:w-[80%] border  dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-4 py-[9px]  text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>

          <div className="my-2 sm:my-5 sm:flex items-center">
            <span className="text-xs sm:text-sm dark:text-gray-400 font-semibold">
              Allow Auto Translation
            </span>
            <div className="w-[80%] my-[20px] mx-2 sm:m-0  sm:ml-auto pl-1">
              <button
                onClick={() => setAllowTranslation(!allowTranslation)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  allowTranslation ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 focus:outline-none focus:ring-[1px] focus:ring-blue-400  ${
                    allowTranslation ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {allowTranslation ? (
                    <span className="text-white mr-8">Yes</span>
                  ) : (
                    <span className="text-white mr-2">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* <div className="md:flex py-5 pt-14 sm:pt-16">
            <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
              Default language
            </label>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="w-full  mt-5 sm:mt-0 sm:w-[80%] ml-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-2 py-[10px] text-sm focus:outline-none "
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="md:flex py-3 sm:py-5  ">
            <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
              Default currency
            </label>
            <select
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value)}
              className="w-full  my-5 sm:my-0 sm:w-[80%] ml-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-2 py-[10px] text-sm focus:outline-none "
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="md:flex  sm:py-5  ">
            <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
              Default time zone
            </label>
            <select
              value={defaultTimeZone}
              onChange={(e) => setDefaultTimeZone(e.target.value)}
              className="w-full  my-5 sm:my-0 sm:w-[80%] ml-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-2 py-[10px] text-sm focus:outline-none "
            >
              {timeZones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="md:flex py-3 sm:py-5  ">
            <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
              Default Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full  my-5 sm:my-0 sm:w-[80%] ml-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-2 py-[10px] text-sm focus:outline-none "
            >
              {dateFormats.map((df) => (
                <option key={df} value={df}>
                  {df}
                </option>
              ))}
            </select>
          </div>

          <div className="md:flex  sm:py-5  ">
            <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
              Receipt size (width)
            </label>
            <select
              value={receiptWidth}
              onChange={(e) => setReceiptWidth(e.target.value)}
              className="w-full  mt-5 sm:mt-0 sm:w-[80%] ml-auto border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-2 py-[10px] text-sm focus:outline-none "
            >
              {receiptSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div> */}
          <div className="pt-9 sm:pt-12">
            <div className="md:flex py-5">
              <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
                Default language
              </label>
              <div className="relative w-full sm:w-[80%] ml-auto mt-6 sm:mt-0">
                <select className="appearance-none w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3  py-[9px]  text-sm focus:outline-none pr-8">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="md:flex py-3 sm:py-5">
              <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
                Default currency
              </label>
              <div className="relative w-full sm:w-[80%] ml-auto my-6 sm:my-0">
                <select className="appearance-none w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-[9px] text-sm focus:outline-none pr-8">
                  <option>Dollar</option>
                  <option>Euro</option>
                  <option>Rupee</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="md:flex sm:py-5">
              <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
                Default time zone
              </label>
              <div className="relative w-full sm:w-[80%] ml-auto my-5 sm:my-0">
                <select className="appearance-none w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-[9px] text-sm focus:outline-none pr-8">
                  <option>Indian/Mayotte (GMT+03:00)</option>
                  <option>UTC</option>
                  <option>GMT+05:30</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="md:flex py-3 sm:py-5">
              <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
                Default Date Format
              </label>
              <div className="relative w-full sm:w-[80%] ml-auto my-6 sm:my-0">
                <select className="appearance-none w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-[9px] text-sm focus:outline-none pr-8">
                  <option>D MMM, YYYY</option>
                  <option>YYYY-MM-DD</option>
                  <option>MM/DD/YYYY</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="md:flex sm:py-5">
              <label className="flex text-xs items-start dark:text-gray-400 sm:text-sm font-semibold mb-1">
                Receipt size (width)
              </label>
              <div className="relative w-full sm:w-[80%] ml-auto mt-6 sm:mt-0">
                <select className="appearance-none w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-md px-3 py-[9px] text-sm focus:outline-none pr-8">
                  <option>57 mm</option>
                  <option>80 mm</option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        <div className=" sm:px-6 ">
          <h3 className=" font-semibold  dark:text-white text-md ">
            Invoice Settings
          </h3>
          <p className=" py-2 text-sm dark:text-gray-400  text-gray-800">
            Configure invoice generation and email sending preferences.
          </p>

          <div className="py-5 mx-3 sm:mx-0 sm:py-6 flex gap-3">
            <button
              onClick={() => setInvoiceEmailEnabled(!invoiceEmailEnabled)}
              className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                invoiceEmailEnabled ? "bg-green-700" : "bg-red-500"
              }`}
            >
              <span
                className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  invoiceEmailEnabled ? "translate-x-[50px]" : "translate-x-0"
                }`}
              />
              <span className="text-sm mr-2 ml-auto">
                {invoiceEmailEnabled ? (
                  <span className="text-white mr-8">Yes</span>
                ) : (
                  <span className="text-white mr-2">No</span>
                )}
              </span>
            </button>
            <p className="text-sm flex  items-end">
              Enable Invoice Send to Customer by email
            </p>
          </div>
        </div>
        <div className="py-6 sm:py-0 sm:px-6 sm:mt-[72px]">
          <div>
            <h3 className=" font-semibold dark:text-white  text-md ">
              Company Information
            </h3>
            <p className=" py-2 text-sm text-gray-800 dark:text-gray-400">
              Enter your company details that will appear on invoices and
              receipts.
            </p>
          </div>
          <div className="py-5  md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              From Email
            </label>
            <input
              type="text"
              placeholder="KachaBazar"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-3 sm:py-5  md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Company Name
            </label>
            <input
              type="text"
              placeholder="HtmlLover ltd"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-5 md:flex">
            <label className="block text-sm dark:text-gray-400  font-semibold">
              Vat Number
            </label>
            <input
              type="text"
              placeholder="47589"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-3 sm:py-5  md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Address
            </label>
            <input
              type="text"
              placeholder="59 Station Rd, Purls Bridge, United Kingdom"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-5 md:flex">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Post Code
            </label>
            <input
              type="text"
              placeholder="2030"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="px-6 pb-1">
          <div className=" sm:pt-7 pb-3">
            <h3 className=" font-semibold text-md ">Contact Information</h3>
            <p className=" py-2 text-sm dark:text-gray-400  text-gray-800">
              Provide contact details for customer communication and support.
            </p>
          </div>
          <div className="py-5 md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Contact
            </label>
            <input
              type="text"
              placeholder="019579034"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-3 sm:py-5 md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="kachabazar@gmail.com"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
          <div className="py-5 md:flex ">
            <label className="block text-xs sm:text-sm dark:text-gray-400  font-semibold">
              Web site
            </label>
            <input
              type="url"
              placeholder="kachabazar-admin.vercel.app"
              className="ml-auto w-full mt-6 sm:mt-0 sm:w-[80%] border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 sm:px-2 py-[9px] text-sm focus:outline-none focus:ring-[1px] focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
