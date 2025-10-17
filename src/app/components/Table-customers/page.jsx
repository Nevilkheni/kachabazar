"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniMagnifyingGlassPlus } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PaginationComponent from "@/app/components/PaginationComponent";
import customersData from "@/app/data/customers.json";
import Delete from "@/app/(marketing)/components/delete";

export default function Tablecustomers({
  currentProducts = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [search, setSearch] = useState("");

  const initialProducts =
    (currentProducts?.length ? currentProducts : customersData) || [];

  const [publishedState, setPublishedState] = useState(
    initialProducts.map(() => true)
  );

  useEffect(() => {
    if (currentProducts?.length) {
      setPublishedState(currentProducts.map(() => true));
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
            placeholder="Search by namelemail/phone"
            className="outline-none text-sm text-black dark:bg-gray-800 px-3 py-[9px] w-full"
          />
          <HiOutlineMagnifyingGlass className="text-[20px] cursor-pointer mx-4 my-auto text-gray-400" />
        </div>

        <div className="flex gap-2 sm:max-w-[160px] w-full">
          <button className="bg-green-500 cursor-pointer w-full text-white xl:px-4 py-[9px] text-sm rounded-md hover:bg-green-600 transition dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
            Filter
          </button>
          <button
            onClick={() => setSearch("")}
            className="border-0.5 cursor-pointer bg-gray-100 border w-full border-gray-200 xl:px-4 py-[9px] rounded-md hover:bg-white text-sm transition dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="h-full">
        <div className="mb-4 xl:w-auto border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto">
          <table className="w-full text-left xl:max-w-[1312px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 font-semibold uppercase text-xs h-10 text-black dark:text-white">
                <th className="px-3">ID</th>
                <th className="px-3">Joining Date</th>
                <th className="px-3">Name</th>
                <th className="px-3">Email</th>
                <th className="px-3">Phone</th>
                <th className="px-3 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((user, index) => (
                <tr
                  key={user?.id || index}
                  className="border-t border-gray-200 dark:border-gray-800 md:h-[39px] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3 text-xs font-semibold">{user?.id}</td>
                  <td className="px-3 text-sm">{user?.joiningDate}</td>
                  <td className="px-3  dark:text-white">{user?.name}</td>
                  <td className="px-3 text-sm">{user?.email}</td>
                  <td className="px-3 text-sm">{user?.phone}</td>
                  <td className="px-3 text-end">
                    <div className="flex items-center justify-end h-full">
                      <button
                        className="px-2 hover:text-green-600 cursor-pointer"
                        onClick={() => console.log("View", user.name)}
                      >
                        <HiMiniMagnifyingGlassPlus className="text-xl text-gray-400" />
                      </button>

                      <button
                        className="px-2 cursor-pointer"
                        onClick={() => {
                          setEditingProduct(user);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>

                      <Delete
                        trigger={
                          <button className="px-2 cursor-pointer">
                            <RiDeleteBin6Line className="text-xl hover:text-red-500 text-gray-400" />
                          </button>
                        }
                        onConfirm={() => console.log("Deleted:", user?.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <UpdateCategoryButton
            open={editOpen}
            setOpen={setEditOpen}
            product={editingProduct}
          /> */}
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
