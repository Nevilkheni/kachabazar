"use client";
import { useState, useEffect } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";

export default function UpdateProductButton({
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[85%] bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className=" w-full bg-[#f9fafb] dark:bg-gray-800 px-6 py-6">
          <div className="md:flex   justify-between mr-20">
            <div>
              <h2 className="text-xl ">Update Products</h2>
              <p className="text-bleck text-sm">
                Update products info, combinations and extras.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="">
                <select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="border text-sm   border-green-500 rounded-md flex px-2 pr-8.5 md:pr-5 xl:pr-8 bg-gray-100 dark:bg-gray-700 h-8  focus:outline-none"
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

        <div className="flex px-4 border-b-[1px] dark:bg-gray-700 border-gray-200 dark:border-gray-600 justify-between ">
          <div className="flex space-x-4  border-gray-200">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-4  py-2 font-medium border-b-2 transition-all duration-300 ${
                activeTab === "basic"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-teal-600 hover:border-teal-600"
              }`}
            >
              Basic Info
            </button>

            {hasVariants && (
              <button
                onClick={() => setActiveTab("combination")}
                className="px-2 py-2  font-medium text-gray-500"
              >
                Combination
              </button>
            )}
          </div>

          <div className="flex  px-3 items-center space-x-3.5">
            <span className="text-orange-500 hidden md:block text-sm">
              Does this product have variants?
            </span>

            <button
              onClick={() => setHasVariants(!hasVariants)}
              className={`relative flex items-center w-[60px] h-[25px] rounded-full transition-colors duration-300 ${
                hasVariants ? "bg-green-700" : "bg-red-500"
              }`}
            >
              <span
                className={`absolute left-[1px] w-[23px] h-[23px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  hasVariants ? "translate-x-[35px]" : "translate-x-0"
                }`}
              />
              <span className="text-sm  mr-2 ml-auto">
                {hasVariants ? (
                  <span className="text-white mr-5 ">Yes</span>
                ) : (
                  <span className="text-white mr-1">No</span>
                )}
              </span>
            </button>
          </div>
        </div>

        <div className="px-6 overflow-y-auto dark:bg-gray-700 pb-10 h-[calc(100%-80px)]">
          <div className="sm:flex pt-8">
            <label className="block text-sm  pb-3 sm:pb-0">
              Product Title/Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full sm:w-[66%] ml-auto border border-gray-200 dark:bg-gray-800 dark:border-gray-500 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="Product Title/Name"
            />
          </div>

          <div className="sm:flex pt-6 pb-4 sm:pb-6  ">
            <label className="block text-sm font-medium">
              Product Description
            </label>
            <textarea
              rows="4"
              defaultValue={product?.description || ""}
              className="w-full sm:w-[66%] ml-auto border mt-3.5 sm:mt-0 border-gray-100 dark:bg-gray-800 dark:border-gray-500 bg-[#f3f4f6] rounded-md px-3 py-2 focus:outline-none focus:ring-1 text-sm"
              placeholder="Product Description"
            ></textarea>
          </div>

          <div className=" sm:flex pb-2 sm:pb-0">
            <label className="block pb-3 sm:pb-0 text-sm font-medium">
              Product Images
            </label>
            <div className="mb-2   w-full sm:w-[66%] ml-auto border-2  border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center p-5 text-center cursor-pointer hover:border-teal-500 transition">
              <p className="px-2 pb-2  text-3xl text-green-600">
                <FiUploadCloud />
              </p>

              <p className="text-sm ">Drag your images here</p>
              <p className="text-gray-400 text-xs my-1 pb-1">
                (Only *.jpeg, *.webp and *.png images will be accepted)
              </p>
            </div>
          </div>

          <div className="sm:flex pt-6 pb-6 2xl:pt-8 ">
            <label className="block text-sm  pb-3 sm:pb-0">Product SKU</label>
            <input
              type="text"
              defaultValue={product?.sku || ""}
              className="w-full sm:w-[66%] ml-auto border border-gray-300 dark:bg-gray-800 dark:border-gray-500 rounded-md px-3 py-2 focus:outline-none text-sm"
              placeholder="Product SKU"
            />
          </div>

          <div className="sm:flex">
            <label className="block text-sm  pb-3 sm:pb-0">
              Product Barcode
            </label>
            <input
              type="text"
              defaultValue={product?.barcode || ""}
              className="w-full sm:w-[66%] ml-auto border border-gray-300 dark:bg-gray-800 dark:border-gray-500 rounded-md px-3 py-2 focus:outline-none text-sm"
              placeholder="Product Barcode"
            />
          </div>

          <div className="sm:flex py-6 mb-9">
            <label className="block text-sm  pb-3 sm:pb-0">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full sm:w-[66%] ml-auto border border-gray-300 dark:bg-gray-700 dark:border-gray-300 rounded-md px-3 py-[9px] focus:outline-none text-sm"
              placeholder="Select Category"
            />
          </div>

          <div className="sm:flex">
            <label className="block text-sm  pb-3 sm:pb-0">
              Default Category
            </label>
            <select className="w-full sm:w-[66%] ml-auto border text-gray-400 border-gray-300 dark:bg-gray-700 dark:border-gray-300 rounded-md px-3 py-[9px] text-sm focus:outline-none">
              <option>Default Category</option>
              <option>No Options Available</option>
            </select>
          </div>

          <div className="sm:flex py-6">
            <label className="block text-sm  pb-3 sm:pb-0">
              Product Price
            </label>
            <div className="flex items-center w-full sm:w-[66%] ml-auto border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 text-gray-500 dark:text-white dark:bg-gray-700 dark:border-gray-500 bg-gray-50 border-r flex items-center text-sm border-gray-300">
                $
              </span>
              <input
                type="text"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className="w-full px-3 py-[9px] dark:bg-gray-800 dark:border-gray-500 text-sm focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="sm:flex">
            <label className="block text-sm  pb-3 sm:pb-0">Sale Price</label>
            <div className="flex items-center w-full sm:w-[66%] ml-auto border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 text-gray-500 dark:text-white dark:bg-gray-700 dark:border-gray-500 bg-gray-50 border-r flex items-center text-sm border-gray-300">
                $
              </span>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-[9px]   dark:bg-gray-800 dark:border-gray-500 text-sm focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="sm:flex py-6">
            <label className="block text-sm  pb-3 sm:pb-0">
              Product Quantity
            </label>
            <input
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-[9px] focus:outline-none text-sm"
              placeholder="0"
            />
          </div>

          <div className="sm:flex">
            <label className="block text-sm  pb-3 sm:pb-0">Product Slug</label>
            <input
              type="text"
              defaultValue={product?.slug || ""}
              className="w-full sm:w-[66%] ml-auto border dark:bg-gray-800 dark:border-gray-500 border-gray-200 rounded-md px-3 py-[9px] focus:outline-none text-sm"
              placeholder="Product Slug"
            />
          </div>

          <div className="sm:flex py-6 pb-6">
            <label className="block text-sm  pb-3 sm:pb-0">Product Tags</label>
            <input
              type="text"
              defaultValue={product?.tags || ""}
              className="w-full sm:w-[66%] ml-auto border bg-gray-100 border-gray-200 rounded-md px-3 py-[9px] focus:outline-none text-sm"
              placeholder="Product Tag (Write then press enter to add new tag)"
            />
          </div>
        </div>

        <footer className=" flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 lg:gap-6   px-4 py-3 sm:px-6 sm:py-4 lg:py-6 text-sm bg-[#f9fafb] dark:bg-gray-800">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer py-2.5 sm:py-[11px] max-w-[630px] border border-gray-200 w-full rounded-md hover:bg-white bg-gray-100 dark:bg-gray-700 dark:border-none dark:hover:bg-gray-800"
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
            Update Product
          </button>
        </footer>
      </div>
    </>
  );
}
