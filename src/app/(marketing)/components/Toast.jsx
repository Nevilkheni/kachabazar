
"use client";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Toast({ message, type = "error", show, onClose }) {
  const [visible, setVisible] = useState(show);
  const [animation, setAnimation] = useState("animate-slideDown");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimation("animate-slideDown");

      const timer = setTimeout(() => {
        handleClose(); // auto-close after 3s
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    // trigger slide up animation first
    setAnimation("animate-slideUp");

    // wait for animation to finish before hiding
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 300); // match with slideUp duration
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 left-1/2  transform -translate-x-1/2 bg-white shadow-lg rounded flex flex-col gap-2 z-50 overflow-hidden w-80 ${animation}`}
    >
      <button
        onClick={handleClose}
        className="ml-auto text-sm text-gray-500 px-3 hover:text-gray-800"
      >
        ✕
      </button>

      <div className="flex items-center gap-2 px-6 pb-2">
        <AiOutlineExclamationCircle
          className={`text-xl ${
            type === "error" ? "text-red-500" : "text-green-500"
          }`}
        />
        <p className="text-sm text-gray-800">{message}</p>
      </div>

      <div
        className={`h-1 w-full ${
          type === "error" ? "bg-red-500" : "bg-green-500"
        } animate-lineShrink`}
      ></div>

      <style jsx>{`
        @keyframes lineShrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-lineShrink {
          animation: lineShrink 3s linear forwards;
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
