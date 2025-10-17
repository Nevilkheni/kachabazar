"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniMagnifyingGlassPlus } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import UpdateCategoryButton from "@/app/(marketing)/components/UpdateCategory";
import categoriesData from "@/app/data/categories.json";
import { HiMinus } from "react-icons/hi";
import Deletecategory from "@/app/(marketing)/components/deletecategory";
import PaginationComponent from "../Paginationcomponent";

export default function Tablecategories({
  currentProducts = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [hasOptions, setHasOptions] = useState(false);

  const initialProducts =
    (currentProducts?.length ? currentProducts : categoriesData) || [];

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

  const filteredProducts = initialProducts.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectRow = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedProducts.map((p) => p?.id).filter(Boolean);
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <div className="bg-white rounded-b-md p-5 dark:bg-gray-800">
      <div className="rounded-t-lg pb-5 flex flex-col gap-3 sm:gap-4 items-center sm:flex-row">
        <div className="border border-gray-200 dark:border-gray-500 text-gray-900 dark:text-gray-800 flex text-sm rounded-md w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Category name"
            className="outline-none text-sm text-black dark:bg-gray-800 px-3 py-[9px] w-full"
          />
          <HiOutlineMagnifyingGlass className="text-[15px]  mx-4 my-auto text-gray-500  dark:text-gray-800" />
        </div>

        <div className="flex gap-2 sm:max-w-[160px] w-full">
          <button className="bg-green-500 cursor-pointer w-full text-white xl:px-4 py-[9px] text-sm rounded-md hover:bg-green-600 transition dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
            Filter
          </button>
          <button
            onClick={() => setSearch("")}
            className="border-0.5 cursor-pointer bg-gray-100 border w-full border-gray-200 xl:px-4 py-[9px] rounded-md hover:bg-white text-sm transition dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-800 "
          >
            Reset
          </button>
        </div>

        <div className="flex sm:ml-2 justify-end ml-auto items-center">
          <button
            onClick={() => setHasOptions(!hasOptions)}
            className={`relative flex items-center w-[115px] h-7 rounded-full transition-colors duration-300 ${
              hasOptions ? "bg-[#2f855a]" : "bg-[#0e9f6e]"
            }`}
          >
            <span
              className={`absolute left-[1px] w-[27px] h-[26px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                hasOptions ? "translate-x-[86px]" : "translate-x-0"
              }`}
            />
            <span className="mr-2 ml-auto">
              {hasOptions ? (
                <span className="text-white text-xs mr-[75px]">All</span>
              ) : (
                <span className="text-white mr-1 text-xs">Parents Only</span>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className="h-full">
        <div className="mb-4 xl:w-auto border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto">
          <table className="w-full text-left  xl:max-w-[1312px]">
            <thead>
              <tr className="bg-gray-100  dark:bg-gray-700 font-semibold  uppercase text-xs h-10 text-black dark:text-white">
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
                <th className="px-3">ID</th>
                <th className="md:px-3  md:w-[146px]">ICON</th>
                <th className="px-3">NAME</th>
                <th className="px-3">DESCRIPTION</th>
                <th className="px-3 text-center">PUBLISHED</th>
                <th className="px-3 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p, index) => (
                <tr
                  key={p?.id || index}
                  className="border-t  border-gray-200 dark:border-gray-800 md:h-[43px] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p?.id)}
                      onChange={() => handleSelectRow(p?.id)}
                    />
                  </td>
                  <td className="px-3 text-xs font-semibold">{p?.id}</td>
                  <td className="px-3.5 ">
                    <img
                      src={p?.img}
                      className="w-10  rounded-full hidden md:block object-cover bg-gray-50 "
                      alt={p?.name}
                    />
                  </td>
                  <td className="px-3 pt-0.5 my-auto text-gray-600 dark:text-white">
                    {p?.name}
                    {hasOptions && p.subNames && (
                      <ul className=" text-xs text-gray-500 list-disc list-inside">
                        {p.subNames.map((sub, i) => (
                          <a className="flex ml-2" key={i}>
                            <HiMinus className="my-auto text-gray-400 mx-0.5" />
                            {sub}
                          </a>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-3 py-2 text-sm max-w-[250px] truncate">
                    {p?.description || "—"}
                  </td>
                  <td className="px-3 text-center">
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
                        } inline-flex h-[15px] w-[30px] items-center rounded-full cursor-pointer transition-colors`}
                      >
                        <span
                          className={`${
                            publishedState[
                              index + (currentPage - 1) * itemsPerPage
                            ]
                              ? "translate-x-4"
                              : "translate-x-0"
                          } inline-block w-[13px] h-[13px] bg-white rounded-full shadow-sm transform transition-transform`}
                        />
                      </Switch>
                    </Switch.Group>
                  </td>

                  <td className="px-3 text-end">
                    <div className="flex items-center justify-end h-full ">
                      <div className="relative">
                        <button
                          className="p-2 hover:text-green-600 cursor-pointer"
                          onMouseEnter={() => setTooltipIndex(`view-${p?.id}`)}
                          onMouseLeave={() => setTooltipIndex(null)}
                        >
                          <HiMiniMagnifyingGlassPlus className="text-xl text-gray-400" />
                        </button>
                        {tooltipIndex === `view-${p?.id}` && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm bg-[#119166] text-white rounded-md shadow-lg whitespace-nowrap z-50">
                            View
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#119166]" />
                          </div>
                        )}
                      </div>

                      <button
                        className="p-2  cursor-pointer"
                        onClick={() => {
                          setEditingProduct(p);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>

                      <Deletecategory
                        trigger={
                          <button className="p-2  cursor-pointer">
                            <RiDeleteBin6Line className="text-xl hover:text-red-500 text-gray-400" />
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

          <UpdateCategoryButton
            open={editOpen}
            setOpen={setEditOpen}
            product={editingProduct}
          />
        </div>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
