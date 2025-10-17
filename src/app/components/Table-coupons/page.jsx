"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PaginationComponent from "@/app/components/PaginationComponent";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import couponsData from "@/app/data/coupons.json";
import UpdateCouponButton from "@/app/(marketing)/components/updateCoupon";
import Delete from "@/app/(marketing)/components/delete";

export default function Tablecoupons({
  currentProducts = [],
  selectedProducts = [],
  setSelectedProducts = () => {},
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  const initialCampaigns = currentProducts.length
    ? currentProducts
    : couponsData || [];

  const [publishedState, setPublishedState] = useState(
    initialCampaigns.map((c) => !!c.published)
  );

  useEffect(() => {
    if (currentProducts?.length) {
      setPublishedState(currentProducts.map((c) => !!c.published));
    }
  }, [currentProducts]);

  const togglePublished = (index) => {
    const newState = [...publishedState];
    newState[index] = !newState[index];
    setPublishedState(newState);
  };

  const [search, setSearch] = useState("");
  const filteredCampaigns = initialCampaigns.filter((c) =>
    c?.campaignName?.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedCampaigns.map((c) => c?.id).filter(Boolean);
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
    <div className="bg-white rounded-b-md p-5 dark:bg-gray-800">
      <div className="rounded-t-lg pb-5 flex flex-col gap-3 sm:gap-4 items-center sm:flex-row">
        <div className="border border-gray-200 text-gray-900 flex text-sm rounded-md w-full  dark:border-gray-500">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search bv coupon code/name"
            className="outline-none text-sm text-black px-3 py-[9px] w-full dark:bg-gray-800 dark:border-gray-800"
          />
          <HiOutlineMagnifyingGlass className="text-[20px] cursor-pointer  mx-4 my-auto text-gray-400 " />
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
      </div>

      {/* Table-------------------------------------------------------------------- */}
      <div className="h-full">
        <div className="mb-8 xl:w-auto border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto">
          <table className="w-full text-left  xl:max-w-[1312px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 font-semibold uppercase text-xs h-10 text-black  dark:text-white">
                <th className="px-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === paginatedCampaigns.length &&
                      paginatedCampaigns.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-3">CAMPAIGN NAME</th>
                <th className="px-2">CODE</th>
                <th className="px-3">DISCOUNT</th>
                <th className="px-3 text-center">PUBLISHED</th>
                <th className="px-3">START DATE</th>
                <th className="px-3">END DATE</th>
                <th className="px-3">STATUS</th>
                <th className="px-3 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCampaigns.map((c, index) => (
                <tr
                  key={c?.id || index}
                  className="border-t border-gray-200 dark:border-gray-800 text-sm md:h-[43px] hover:bg-gray-50  dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(c?.id)}
                      onChange={() => handleSelectRow(c?.id)}
                    />
                  </td>
                  <td className="px-3 py-1 items-center flex">
                    {c?.image ? (
                      <img
                        src={c.image}
                        className="w-8 h-8 ml-1 rounded-md object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                    <p className=" pl-3">{c?.campaignName}</p>
                  </td>
                  <td className="pr-3 px-2">{c?.code}</td>
                  <td className="px-3 font-semibold">{c?.discount}</td>
                  <td className="px-3 text-center">
                    <Switch
                      checked={
                        publishedState[index + (currentPage - 1) * itemsPerPage]
                      }
                      onChange={() =>
                        togglePublished(
                          index + (currentPage - 1) * itemsPerPage
                        )
                      }
                      className={`${
                        publishedState[index + (currentPage - 1) * itemsPerPage]
                          ? "bg-green-700"
                          : "bg-red-500 "
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
                  <td className="px-3">{c?.startDate}</td>
                  <td className="px-3">{c?.endDate}</td>
                  <td className="px-3">
                    <span
                      className={`px-2 py-1 rounded-md font-light text-xs ${
                        c?.status === "Active"
                          ? "bg-[#14b8a6]  dark:bg-[#187e7b] text-white dark:text-gray-200"
                          : "bg-[#f43f5e] dark:bg-[#a9233a] text-white dark:text-gray-200"
                      }`}
                    >
                      {c?.status}
                    </span>
                  </td>

                  <td className="px-3 text-end">
                    <div className="flex items-center justify-end h-full ">
                      <button
                        className="p-2  cursor-pointer"
                        onClick={() => {
                          setEditingProduct(c);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>

                      <Delete
                        trigger={
                          <button className="p-2 cursor-pointer">
                            <RiDeleteBin6Line className="text-xl hover:text-red-500  text-gray-400" />
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

          <UpdateCouponButton
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
