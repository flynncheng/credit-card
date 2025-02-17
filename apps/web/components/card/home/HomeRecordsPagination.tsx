import React, { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination";
import usePagination from "@/hooks/card/usePagination";

export default function HomeRecordsPagination({
  totalCount,
  pageSize,
  page,
  setPage,
}: {
  totalCount: number;
  pageSize: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const range = usePagination({
    totalCount: totalCount,
    pageSize: pageSize,
    currentPage: page,
  });
  console.log(range, "range");

  const handleClickPrevious = () => {
    if (page !== 1) setPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    const lastPage = range?.slice(-1)[0];
    if (page !== lastPage) setPage((prev) => prev + 1);
  };

  return (
    <Pagination className="bg-muted/25 p-2 py-4 border-t">
      <PaginationContent className="justify-between">
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handleClickPrevious}
          />
        </PaginationItem>
        {range &&
          range.map((el, index) => {
            if (el === "...") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    className="cursor-pointer max-[400px]:w-8"
                    onClick={() => setPage(el as number)}
                    isActive={el === page}
                  >
                    {el}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={handleClickNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
