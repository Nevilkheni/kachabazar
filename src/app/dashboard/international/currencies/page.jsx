"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import PaginationComponent from "@/app/components/PaginationComponent";
import Delete from "@/app/(marketing)/components/delete";
import currencieData from "@/app/data/currencies.json";
import UpdateLanguageButton from "@/app/(marketing)/components/updatelanguage";
import UpdateCurrencyButton from "@/app/(marketing)/components/updatecurrency";

export default function Currencies({ currentLanguages = [] }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languages = currentLanguages.length ? currentLanguages : currencieData;
  const [enabledState, setEnabledState] = useState(
    languages.map((l) => !!l.enabled)
  );

  const toggleEnabled = (index) => {
    setEnabledState((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      (l.symbol && l.symbol.toLowerCase().includes(search.toLowerCase()))
  );

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    const pageIds = paginated.map((l) => l.id);
    if (e.target.checked) {
      setSelectedLanguages((prev) =>
        Array.from(new Set([...prev, ...pageIds]))
      );
    } else {
      setSelectedLanguages((prev) =>
        prev.filter((id) => !pageIds.includes(id))
      );
    }
  };

  const handleSelectRow = (id) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected = paginated.every((l) =>
    selectedLanguages.includes(l.id)
  );

  return (
    <div className="bg-white rounded-b-md dark:bg-gray-800 pb-8 lg:pb-9 p-5">
      <div className="rounded-t-lg pb-5 flex flex-col gap-3 sm:gap-4 items-center sm:flex-row">
        <div className="border border-gray-200 dark:border-gray-500 text-gray-900 flex text-sm rounded-md w-full dark:text-gray-500">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by iso code"
            className="outline-none text-sm px-3 py-[9px] dark:bg-gray-800 w-full"
          />
          <HiOutlineMagnifyingGlass className="text-[16px] cursor-pointer mx-4 my-auto text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="h-full">
        <div className="mb-4 xl:w-auto border border-gray-200 dark:border-gray-700 rounded-md overflow-x-auto">
          <table className="w-full text-left min-w-[600px] xl:max-w-[1312px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 font-semibold uppercase text-xs h-10 text-black dark:text-white">
                <th className="px-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected && paginated.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 text-center">Name</th>
                <th className="px-3 text-center">Symbol</th>
                <th className="px-3 text-center">Enabled</th>
                <th className="px-3 text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((l, index) => (
                <tr
                  key={l.id}
                  className="border-t border-gray-200 dark:border-gray-800 md:h-[39px] text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-3">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(l.id)}
                      onChange={() => handleSelectRow(l.id)}
                    />
                  </td>
                  <td className="px-3 py-2 text-center">{l.name}</td>
                  <td className="px-3 py-2 text-center">{l.symbol}</td>
                  <td className="px-3 text-center">
                    <Switch
                      checked={enabledState[startIndex + index] || false}
                      onChange={() => toggleEnabled(startIndex + index)}
                      className={`${
                        enabledState[startIndex + index]
                          ? "bg-[#2f855a]"
                          : "bg-red-600"
                      } inline-flex h-[15px] w-[30px] items-center rounded-full cursor-pointer transition-colors`}
                    >
                      <span
                        className={`${
                          enabledState[startIndex + index]
                            ? "translate-x-4"
                            : "translate-x-0"
                        } inline-block w-[13px] h-[13px] bg-white rounded-full shadow-sm transform transition-transform`}
                      />
                    </Switch>
                  </td>
                  <td className="px-3 text-end">
                    <div className="flex items-center justify-end h-full">
                      <button
                        className="p-2 cursor-pointer"
                        onClick={() => {
                          setEditingLanguage(l);
                          setEditOpen(true);
                        }}
                      >
                        <FiEdit className="text-xl hover:text-green-600 text-gray-400" />
                      </button>
                      <Delete
                        trigger={
                          <button className="p-2 cursor-pointer">
                            <RiDeleteBin6Line className="text-xl hover:text-red-500 text-gray-400" />
                          </button>
                        }
                        onConfirm={() => console.log("Deleted:", l.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <UpdateCurrencyButton
            open={editOpen}
            setOpen={setEditOpen}
            product={editingLanguage}
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
