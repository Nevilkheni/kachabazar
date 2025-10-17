"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniMagnifyingGlassPlus } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import PaginationComponent from "@/app/components/PaginationComponent";
import { MdKeyboardArrowDown } from "react-icons/md";
import UpdateProductButton from "@/app/(marketing)/components/Update Products";
import productData from "@/app/data/productmenu.json";
import Delete from "@/app/(marketing)/components/delete";

export default function Tableproduct({
  currentProducts = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedPrice, setSelectedPrice] = useState("Price");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  const router = useRouter();
  const handleViewProduct = (product) => {
    router.push(`/Table-product/${product.id}`);
  };

  const categories = [
    "Category",
    "All",
    "Boopathi",
    "Baby Food",
    "Rui",
    "Tuna",
    "Beef",
    "Fish",
    "Meat",
    "Fish & Meat",
    "Orange",
    "Apple",
  ];

  const sortOptions = [
    "Low to High",
    "High to Low",
    "Published",
    "Unpublished",
    "Status - Selling",
    "Status - Out of Stock",
    "Date Added (Asc)",
    "Date Added (Desc)",
    "Date Updated (Asc)",
    "Date Updated (Desc)",
  ];

  const initialProducts =
    (currentProducts?.length ? currentProducts : productData) || [];

  const [publishedState, setPublishedState] = useState(
    initialProducts.map((p) => !!p.published)
  );

  useEffect(() => {
    if (currentProducts?.length) {
      setPublishedState(currentProducts.map((p) => !!p.published));
    }
  }, [currentProducts]);

  const togglePublished = (index) => {
    const newState = [...publishedState];
    newState[index] = !newState[index];
    setPublishedState(newState);
  };

  const [search, setSearch] = useState("");
  const filteredProducts = initialProducts.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedPrice) {
      case "Low to High":
        return (a?.price || 0) - (b?.price || 0);
      case "High to Low":
        return (b?.price || 0) - (a?.price || 0);
      case "Published":
        return (
          (b?.published === true ? 1 : 0) - (a?.published === true ? 1 : 0)
        );
      case "Unpublished":
        return (
          (a?.published === true ? 1 : 0) - (b?.published === true ? 1 : 0)
        );
      case "Status - Selling":
        return a?.status === "Selling" ? -1 : 1;
      case "Status - Out of Stock":
        return a?.status === "Out of Stock" ? -1 : 1;
      case "Date Added (Asc)":
        return (a?.id || 0) - (b?.id || 0);
      case "Date Added (Desc)":
        return (b?.id || 0) - (a?.id || 0);
      default:
        return 0;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedProducts.map((p) => p?.id).filter(Boolean);
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-b-md  dark:bg-gray-800  p-5 ">
      <div className="rounded-t-lg  pb-5 flex flex-col gap-3 sm:gap-4 items-center sm:flex-row">
        <div className="border border-gray-200 dark:border-gray-500 text-gray-900 flex text-sm rounded-md w-full dark:text-gray-500">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Product"
            className="outline-none text-sm px-3 py-[9px] dark:bg-gray-800 w-full "
          />
          <HiOutlineMagnifyingGlass className="text-[20px] cursor-pointer  mx-4 my-auto text-gray-400 " />
        </div>

        <div className="relative w-full">
          <button
            onClick={() => {
              setOpenCategory(!openCategory);
              setOpenPrice(false);
            }}
            className="border border-gray-200  px-3 py-[9px] text-sm rounded-md w-full flex justify-between items-center bg-white dark:bg-gray-800 cursor-pointer dark:border-gray-700"
          >
            {selectedCategory}
            <MdKeyboardArrowDown
              className={`text-gray-500 w-4.5 h-4.5  transition-transform duration-200 ${
                openCategory ? "" : ""
              }`}
            />
          </button>
          {openCategory && (
            <div className="absolute z-50 mt-1 w-full bg-white border  border-gray-200 dark:border-gray-700 rounded-md dark:bg-gray-800 ">
              {categories.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedCategory(item);
                    setOpenCategory(false);
                  }}
                  className={`px-8 py-1 rounded-md m-1 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedCategory === item
                      ? "bg-gray-50 dark:hover:bg-gray-700  font-medium"
                      : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full">
          <button
            onClick={() => {
              setOpenPrice(!openPrice);
              setOpenCategory(false);
            }}
            className="border border-gray-200 px-3 py-[9px] text-sm rounded-md w-full flex justify-between items-center bg-white cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          >
            {selectedPrice}
            <MdKeyboardArrowDown
              className={`text-gray-500 w-4.5 h-4.5 transition-transform duration-200 ${
                openPrice ? "" : ""
              }`}
            />
          </button>
          {openPrice && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200  rounded-md dark:bg-gray-800 dark:border-gray-700">
              {sortOptions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedPrice(item);
                    setOpenPrice(false);
                  }}
                  className={`px-6 py-1 rounded-md m-1 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700${
                    selectedPrice === item ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 xl:max-w-[160px] w-full">
          <button className="bg-green-500 cursor-pointer w-full text-white xl:px-4 py-[9px] text-sm rounded-md hover:bg-green-600 transition dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
            Filter
          </button>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("Category");
              setSelectedPrice("Price");
              setOpenCategory(false);
              setOpenPrice(false);
            }}
            className="border-0.5 cursor-pointer bg-gray-100 border w-full border-gray-200 xl:px-4 py-[9px] rounded-md hover:bg-white text-sm transition dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-800 "
          >
            Reset
          </button>
        </div>
      </div>

      {/* tabl ------------------------------------------------------------------------*/}
      <div className="h-full    ">
        <div className=" mb-4   xl:w-auto border border-gray-200  dark:border-gray-700 rounded-md overflow-x-auto ">
          <table className="w-full  text-left   min-w-[830px] xl:max-w-[1312px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 font-semibold uppercase  text-xs h-10 text-black dark:text-white">
                <th className="px-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === paginatedProducts.length &&
                      paginatedProducts.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="w-10 md:w-auto px-3 ">PRODUCT NAME</th>
                <th className="px-3">CATEGORY</th>
                <th className="px-3">PRICE</th>
                <th className="px-3">SALE PRICE</th>
                <th className="px-3">STOCK</th>
                <th className="px-3">STATUS</th>
                <th className="px-3 text-center">VIEW</th>
                <th className="px-3 text-center">PUBLISHED</th>
                <th className="px-3 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p, index) => (
                <tr
                  key={p?.id || index}
                  className="border-t border-gray-200 dark:border-gray-800 md:h-[39px] text-sm hover:bg-gray-50 dark:hover:bg-gray-800  transition-colors"
                >
                  <td className="px-3 ">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p?.id)}
                      onChange={() => handleSelectRow(p?.id)}
                    />
                  </td>
                  <td className="px-3.5   py-0.5  md:flex gap-3 items-center">
                    <img
                      src={p?.img}
                      className="w-0 h-0 md:w-[38px] md:h-[38px]  bg-gray-50 rounded-full object-cover"
                    />
                    <p className="max-w-[100px] md:max-w-max">{p?.name}</p>
                  </td>
                  <td className="px-3 py-0 max-w-[90px] md:max-w-max">
                    {p?.category}
                  </td>
                  <td className="px-3 font-bold">
                    ${(p?.price || 0).toFixed(2)}
                  </td>
                  <td className="px-3 font-bold">
                    ${(p?.salePrice || 0).toFixed(2)}
                  </td>
                  <td className="px-3">{(p?.stock || 0).toLocaleString()}</td>
                  <td className="px-3 min-w-[90px] 2xl:min-w-[80px]">
                    <span
                      className={`  px-2 py-1 rounded-md font-light text-xs ${
                        p?.status === "Selling"
                          ? "bg-[#14b8a6]  dark:bg-[#187e7b] px-2 text-white"
                          : "border  px-0 border-gray-200 text-black  dark:border-none dark:text-white"
                      }`}
                    >
                      {p?.status}
                    </span>
                  </td>
                  <td className="px-3 relative text-center">
                    {/* <button
                      className="text-gray-400  text-[21px] cursor-pointer hover:text-green-600 transition-colors"
                      onMouseEnter={() => setTooltipIndex(`view-${p?.id}`)}
                      onMouseLeave={() => setTooltipIndex(null)}
                    >
                      <HiMiniMagnifyingGlassPlus />
                    </button> */}
                    <button
                      onClick={() => handleViewProduct(p)}
                      className="text-gray-400 text-[21px] cursor-pointer hover:text-green-600 transition-colors"
                    >
                      <HiMiniMagnifyingGlassPlus />
                    </button>

                    {tooltipIndex === `view-${p?.id}` && (
                      <div className="absolute cursor-pointer bottom-full left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm bg-[#119166] text-white rounded-md shadow-lg whitespace-nowrap z-50">
                        View
                        <div className="absolute cursor-pointer top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#119166]"></div>
                      </div>
                    )}
                  </td>

                  <td className="px-3 text-center ">
                    <Switch.Group as="div">
                      <Switch
                        checked={
                          publishedState[
                            index + (currentPage - 1) * itemsPerPage
                          ] || false
                        }
                        onChange={() =>
                          togglePublished(
                            index + (currentPage - 1) * itemsPerPage
                          )
                        }
                        className={`${
                          publishedState[
                            index + (currentPage - 1) * itemsPerPage
                          ]
                            ? "bg-[#2f855a]"
                            : "bg-red-700"
                        } inline-flex h-[15px] w-[30px] items-center rounded-full cursor-pointer  transition-colors`}
                      >
                        <span
                          className={`${
                            publishedState[
                              index + (currentPage - 1) * itemsPerPage
                            ]
                              ? "translate-x-4"
                              : "translate-x-0"
                          } inline-block w-[13px] h-[13px]  relative bg-white rounded-full  shadow-sm transform transition-transform `}
                        />
                      </Switch>
                    </Switch.Group>
                  </td>

                  <td className="px-3 text-end">
                    <div className="flex items-center justify-end h-full ">
                      <button
                        className="p-2  cursor-pointer"
                        onClick={() => {
                          setEditingProduct(p);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>

                      <Delete
                        trigger={
                          <button className="p-2 cursor-pointer">
                            <RiDeleteBin6Line className="text-xl  hover:text-red-500 text-gray-400" />
                          </button>
                        }
                        onConfirm={() => {
                          console.log("Deleted:", p?.name);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <UpdateProductButton
            open={editOpen}
            setOpen={setEditOpen}
            product={editingProduct}
          />
        </div>
      </div>
      {/* tableend-------------------------------------------------- */}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
