"use client";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Toast from "./Toast";

export default function Deletecategory({ trigger, disabled }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDeleteClick = () => {
    setShowToast(true);
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={() => !disabled && setShowModal(true)}
        className="w-full sm:w-auto inline-block"
      >
        {trigger ? (
          trigger
        ) : (
          <button
            disabled={disabled}
            className={`gap-3 w-full justify-center px-4 py-2 text-white flex rounded-md transition
              ${
                disabled
                  ? "bg-[#f69ba9]  cursor-default dark:bg-[#791b38] dark:text-gray-400"
                  : "bg-[#f43f5e] hover:bg-[#e11d48] cursor-pointer dark:bg-[#e11d48] dark:hover:bg-[be123c]"
              }`}
          >
            <RiDeleteBin6Line className="my-auto" />
            <p className="text-sm my-auto">Delete</p>
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 overlay-fade"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal */}
          <div className="bg-gray-50 dark:bg-gray-950 border-gray-50 border-[1px] dark:border-gray-800  w-full mx-4 sm:mx-0 sm:max-w-lg rounded-lg shadow-md p-6 relative modal-animate">
            <button
              onClick={() => setShowModal(false)}
              className="absolute cursor-pointer top-0 right-0 text-xs px-[11px] py-1 m-4 border-[1px]  border-red-300 dark:border-red-300 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-white"
            >
              ✕
            </button>

            <div className="flex flex-col items-center justify-center">
              <div className="text-[#f43f5e] my-4">
                <MdOutlineDeleteOutline className="text-4xl text-center" />
              </div>

              <h2 className="text-lg text-black dark:text-white text-center pt-3 pb-2">
                Are You Sure! Want to Delete{" "}
                <span className="text-red-500">Selected Products</span>?
              </h2>

              <p className="text-sm text-center text-black dark:text-white py-4">
                Do you really want to delete these records? You can't view this
                in your list anymore if you delete!
              </p>

              <div className="flex w-full sm:w-auto flex-col-reverse sm:flex-row gap-2 ml-auto text-sm">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-white border-1 border-gray-200 transition"
                >
                  No, Keep It
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-4 py-2 cursor-pointer ml-auto bg-[#f43f5e] dark:bg-[#e11d48] text-white  rounded-md hover:bg-[#e11d48] transition"
                >
                  Yes, Delete It
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            .modal-animate {
              transform: translate(100%, 100%) scale(0.5);
              opacity: 0;
              animation: flyIn 0.1s forwards ease-out;
            }

            .overlay-fade {
              animation: fadeIn 0.1s forwards ease-out;
            }

            @keyframes flyIn {
              to {
                transform: translate(0, 0) scale(1);
                opacity: 1;
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

      <Toast
        show={showToast}
        message="This feature is disabled for demo!"
        type="error"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
