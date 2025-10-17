"use client";
import { useState } from "react";

export default function StoreSettings() {
  const [checked, setChecked] = useState(true);
  const [Paymentchecked, PaymentsetChecked] = useState(true);
  const [RazorPaychecked, RazorPaysetChecked] = useState(false);
  const [Loginchecked, LoginsetChecked] = useState(true);
  const [Githubchecked, Githubsetchecked] = useState(true);
  const [Facebookchecked, Facebooksetchecked] = useState(true);
  const [Gogglechecked, Gogglesetchecked] = useState(true);
  const [Tawkchecked, Tawksetchecked] = useState(true);

  return (
    <div>
      <div className="p-4 sm:p-6 mb-6 sm:mb-2 max-w-[1352px] w-full mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md">
        <div className="flex justify-end items-end">
          <button className="bg-[#0d9488] text-sm text-white px-6 py-[10px] rounded-md hover:bg-[#14b8a6] transition">
            Update
          </button>
        </div>

        <div>
          <div className="flex w-full items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Enable Cash On Delivery
              </p>
              <p className="text-[12px] dark:text-gray-400">
                (This is enabled by default)
              </p>
            </div>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => setChecked(!checked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  checked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    checked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {checked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Stripe Payment
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => PaymentsetChecked(!Paymentchecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Paymentchecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Paymentchecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Paymentchecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Paymentchecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Stripe Key
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Stripe Secret
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable RazorPay
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => RazorPaysetChecked(!RazorPaychecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  RazorPaychecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    RazorPaychecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {RazorPaychecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {RazorPaychecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  RazorPay ID
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="RazorPay ID"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  RazorPay Secret
                </label>
                <input
                  type="text"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="RazorPay Secret"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Google Login
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => LoginsetChecked(!Loginchecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Loginchecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Loginchecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Loginchecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Loginchecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Google Client ID
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Google Secret Key
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Github Login
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => Githubsetchecked(!Githubchecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Githubchecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Githubchecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Githubchecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Githubchecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Github ID
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Github Secret
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Facebook Login
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => Facebooksetchecked(!Facebookchecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Facebookchecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Facebookchecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Facebookchecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Facebookchecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Facebook ID
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Facebook Secret
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Google Analytics
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => Gogglesetchecked(!Gogglechecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Gogglechecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Gogglechecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Gogglechecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Gogglechecked && (
            <div className="sm:flex items-center mb-8">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Google Analytic Key
              </label>
              <input
                type="password"
                className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                placeholder="••••••••••••••••••••••••••••••••••"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center w-full justify-between mb-8">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Enable Tawk Chat
            </p>
            <div className="flex items-center px-[7px] justify-start w-[80%]">
              <button
                onClick={() => Tawksetchecked(!Tawkchecked)}
                className={`relative flex items-center w-[80px] h-[30px] rounded-full transition-colors duration-300 ${
                  Tawkchecked ? "bg-green-700" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute left-[1px] w-[28px] h-[28px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    Tawkchecked ? "translate-x-[50px]" : "translate-x-0"
                  }`}
                />
                <span className="text-sm mr-2 ml-auto">
                  {Tawkchecked ? (
                    <span className="text-white mr-9">Yes</span>
                  ) : (
                    <span className="text-white mr-1">No</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          {Tawkchecked && (
            <>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Tawk Chat Property ID
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
              <div className="sm:flex items-center mb-8">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Tawk Chat Widget ID
                </label>
                <input
                  type="password"
                  className="w-full sm:w-[80%] ml-auto border dark:bg-gray-800 dark:border-gray-500 
                  border-gray-200 rounded-md px-3 py-2 sm:py-[9px] focus:outline-none focus:ring-teal-500 text-sm"
                  placeholder="••••••••••••••••••••••••••••••••••"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
