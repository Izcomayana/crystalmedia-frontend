"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex flex-col items-center justify-between gap-3 md:flex-row">
      <div className="">
        <Button
          variant="outline"
          className="border-0"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft className="h-4 w-4" />
          <span className="text-sm text-gray-950 ml-2">Previous</span>
        </Button>
      </div>

      <div className="flex gap-2">
        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "primary" : "outline"}
              size="icon"
              className="border-0"
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          ),
        )}
      </div>

      <div className="">
        <Button
          variant="outline"
          className="border-0"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="text-sm text-gray-950 mr-2">Next</span>
          <FaArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
