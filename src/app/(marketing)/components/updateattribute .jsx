"use client";
import { useState, useEffect } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";

export default function UpdateAttributeButton({
  open: externalOpen,
  setOpen: externalSetOpen,
  product,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen =
    externalSetOpen !== undefined ? externalSetOpen : setInternalOpen;

  const [hasVariants, setHasVariants] = useState(false);
  const [selected, setSelected] = useState("en");
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

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    if (product) {
      setFormData({
        name: product?.name || "",
        category: product?.category || "",
        price: product?.price || "",
        salePrice: product?.salePrice || "",
        stock: product?.stock || "",
      });
      setHasVariants(!!product?.hasVariants);
    }
  }, [open, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
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
        <div className=" w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6">
          <div className="md:flex   justify-between mr-20">
            <div>
              <h2 className="text-xl ">Update Attribute Value</h2>
              <p className="text-bleck text-sm">
                Updated your attribute values and necessary information from
                here
              </p>
            </div>
            <div className="flex  gap-10">
              <div className="">
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="border text-sm   border-green-500 rounded-md flex  px-2  pr-8.5 md:pr-5 xl:pr-8 dark:bg-gray-700 bg-gray-100 h-8  focus:outline-none"
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

        <div className="px-6  py-8 pb-10 overflow-y-auto dark:bg-gray-700 h-[calc(100%-80px)] ">
          <div>
            <div className="sm:flex ">
              <label className="block  text-sm  pb-3 sm:pb-0 ">
                Attribute Title
              </label>
              <input
                type="text"
                className=" w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2.5  focus:outline-none  focus:ring-teal-500 text-sm"
                placeholder="Attribute Title"
              />
            </div>

            <div className="sm:flex py-6">
              <label className="block  text-sm pb-3 sm:pb-0 font-medium">
                Display Name
              </label>
              <input
                type="text"
                className=" w-full sm:w-[66%] ml-auto border border-gray-200 dark:border-gray-500 dark:bg-gray-800 rounded-md px-3 py-2.5  focus:outline-none  focus:ring-teal-500 text-sm"
                placeholder="Attribute Title"
              />
            </div>
          </div>
        </div>

        <footer className=" flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6   px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer py-2.5 sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:hover:text-white dark:border-gray-800 hover:dark:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Updated Product:", {
                ...product,
                ...formData,
                hasVariants,
              });
              setOpen(false);
            }}
            className="cursor-pointer max-w-[630px] py-2.5 sm:py-[11px] w-full bg-[#10b77f] text-white rounded-md hover:bg-teal-600 dark:text-black"
          >
            Update Attribute
          </button>
        </footer>
      </div>
    </>
  );
}
