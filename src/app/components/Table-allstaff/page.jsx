"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiArrowDownSLine } from "react-icons/ri";
import {
  HiMiniMagnifyingGlassPlus,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import PaginationComponent from "@/app/components/PaginationComponent";
import allstaffData from "@/app/data/allstaff.json";
import Deletecategory from "@/app/(marketing)/components/deletecategory";
import UpdatestaffButton from "@/app/(marketing)/components/updatestaff";

export default function Tableallstaff({
  currentProducts = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const initialProducts =
    (currentProducts?.length ? currentProducts : allstaffData) || [];

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

  const roles = ["All", "Admin", "Cashier", "Super Admin"];

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
            placeholder="Search by name/email/pnone"
            className="outline-none text-sm text-black dark:text-white dark:bg-gray-800 px-3 py-[9px] w-full"
          />
          <HiOutlineMagnifyingGlass className="text-[15px] mx-4 my-auto text-gray-500 dark:text-gray-300" />
        </div>

        <div className="relative w-full">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 w-full rounded-md px-3 py-[9px] text-sm flex justify-between items-center cursor-pointer focus-within:ring-2  focus-within:ring-blue-500"
          >
            <span
              className={
                selectedRole ? "text-gray-900 dark:text-white" : "text-gray-400"
              }
            >
              {selectedRole || "Staff Role"}
            </span>
            <RiArrowDownSLine
              size={18}
              className={`text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg text-sm">
              {roles.map((role) => (
                <li
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 m-1 dark:hover:bg-gray-700 ${
                    selectedRole === role
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 sm:max-w-[160px] w-full">
          <button className="bg-green-500 cursor-pointer w-full text-white xl:px-4 py-[10px] text-sm rounded-md hover:bg-green-600 transition dark:bg-[#16a34a] dark:hover:bg-[#15803d]">
            Filter
          </button>
          <button
            onClick={() => setSearch("")}
            className="border-0.5 cursor-pointer text-white dark:text-black bg-[#10b77f]  w-full  xl:px-4 py-[10px] rounded-md hover:bg-[#27be8c] text-sm transition"
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
                <th className="px-3">NAME</th>
                <th className="px-6">EMAIL</th>
                <th className="px-3">CONTACT</th>
                <th className="px-5">JOINING DATE</th>
                <th className="pl-2 pr-4">ROLE</th>
                <th className="px-4 text-center">STATUS</th>
                <th className="px-3 text-center">PUBLISHED</th>
                <th className="pr-10 text-end">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((p, index) => (
                <tr
                  key={p?.id || index}
                  className="border-t border-gray-200 dark:border-gray-800 md:h-[43px] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      {p?.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-[40px] h-[40px] rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full bg-gray-200 text-black dark:bg-gray-800 flex items-center justify-center  border-[1px] border-dotted border-gray-200 dark:border-gray-300 dark:text-white">
                          {p?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{p?.name}</span>
                    </div>
                  </td>

                  <td className="px-6">{p?.email}</td>
                  <td className="px-3">{p?.contact}</td>
                  <td className="px-5">{p?.joiningDate}</td>
                  <td className="pl-2 pr-4 font-bold">{p?.role}</td>
                  <td className="px-4 text-center">
                    <span
                      className={`inline-block px-[10px] py-[3px] text-xs font-semibold rounded-md ${
                        p?.status === "Active"
                          ? "bg-[#14b8a6] text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {p?.status}
                    </span>
                  </td>

                  <td className="px-3 text-center">
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
                        publishedState[index + (currentPage - 1) * itemsPerPage]
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
                  </td>

                  <td className=" gap-1 pr-3 text-end flex items-center justify-end ">
                    <button
                      className="p-2 pl-1 hover:text-green-600 cursor-pointer"
                      onMouseEnter={() => setTooltipIndex(`view-${p?.id}`)}
                      onMouseLeave={() => setTooltipIndex(null)}
                    >
                      <HiMiniMagnifyingGlassPlus className="h-5 w-5 text-gray-400" />
                    </button>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="py-2 pl-3 pr-1  cursor-pointer"
                        onClick={() => {
                          setEditingProduct(p);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>
                      <Deletecategory
                        trigger={
                          <button className="p-2 cursor-pointer">
                            <RiDeleteBin6Line className="text-xl hover:text-red-500 text-gray-400" />
                          </button>
                        }
                        onConfirm={() => console.log("Deleted:", p?.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <UpdatestaffButton
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
