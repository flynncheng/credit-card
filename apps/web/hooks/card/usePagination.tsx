import { useMemo } from "react";

export type UsePaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
};

const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) => {
  // create an array of certain length and set the elements within it from start to end value
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  };

  const paginationRange = useMemo(() => {
    // number of pages
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // page numbers we want to show in our paginationComponent
    const totalPageNumbers = siblingCount * 2 + 5; //siblingCount + firstPage + lastPage + currentPage + 2*dots

    // case 1: number of pages is less than the page numbers we want to show in our paginationComponent
    // return the range [1..totalPageCount]
    if (totalPageCount <= totalPageNumbers) {
      return range(1, totalPageCount);
    }

    // calcute left and right sibling index and make sure they are within range 1 and totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    // do not show dots when there is just one page number to be inserted between the extremes of sibling and the page limits
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // case 2: only right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPageCount];
    }

    //case 3: only left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    // case 4: both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRage = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRage, "...", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
