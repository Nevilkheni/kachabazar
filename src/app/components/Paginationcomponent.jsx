"use client";
import { MdKeyboardArrowLeft, MdOutlineArrowForwardIos } from "react-icons/md";

export default function PaginationComponent({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2  ">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-1 py-1 text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
      >
        <MdKeyboardArrowLeft className="my-auto" />
        <p>Previous</p>
      </button>

      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-sm">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => setCurrentPage(page)}
            className={`px-1 py-1 text-sm rounded min-w-[40px] cursor-pointer transition-colors ${
              currentPage === page
                ? "bg-gray-100  dark:bg-gray-800 text-black dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-900 "
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-1 py-1 text-sm flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 rounded transition-colors"
      >
        <p>Next</p>
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
}
