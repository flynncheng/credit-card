import { useReadRecordTopupListQuery } from "@/lib/redux/api/recordApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem } from "@/lib/redux/slices/cardSlice";
import { TransItem } from "@/lib/redux/slices/recordSlice";
import { formatISODate } from "@/utils/dateUtils";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@workspace/ui/components/table";
import { ChevronRight, ShoppingBag } from "lucide-react";
import HomeRecordsPagination from "./HomeRecordsPagination";
import { useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Info } from "lucide-react";

export const enum itemType {
  REFUND = "REFUND",
  REVERSAL = "REVERSAL",
}

export default function HomeRecordsTopup() {
  const [page, setPage] = useState(1);

  const cardItem = useAppSelector(selectCardItem);

  const cardId = cardItem.id;
  const pageNumber = page - 1;
  const pageSize = 2;
  // const pageSize = 6;
  const beginTime = "2024-01-01 00:00:00";
  const endTime = "2025-12-31 23:59:59";
  const { data, isFetching } = useReadRecordTopupListQuery({
    cardId,
    pageNumber,
    pageSize,
    beginTime,
    endTime,
  });

  if (isFetching)
    return (
      <div className="space-y-6 mt-6">
        {Array(pageSize)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="h-[50px]" key={index} />
          ))}
      </div>
    );

  if (!data)
    return (
      <Alert className="mt-6">
        <Info className="h-4 w-4" />
        <AlertTitle className="text-sm">No records.</AlertTitle>
        <AlertDescription>
          Start making top-ups to see your records here.
        </AlertDescription>
      </Alert>
    );

  return (
    <>
      <Table>
        <TableBody>
          {data?.content.map((item: TransItem) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium pr-0">
                <div className="flex min-w-0 gap-x-4">
                  <ShoppingBag strokeWidth={1} />
                  <div className="min-w-0 flex-auto text-xs">
                    <p className="leading-6 text-gray-900">
                      {item.cardAcceptorLocationName}
                    </p>
                    <p className="mt-1 truncate leading-5 text-gray-500">
                      {formatISODate(item.updatedTime)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex-grow text-right text-xs">
                  <p className="text-sm leading-6 text-gray-900">
                    {(item.type === itemType.REFUND ||
                      item.type.includes(itemType.REVERSAL)) &&
                      "-"}
                    {item.billingAmount} {item.billingCurrency}
                  </p>
                  <div className="mt-1 flex justify-end items-center gap-x-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                    <p className="leading-5 text-emerald-500">Completed</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right px-0">
                <ChevronRight strokeWidth={1} size={18} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <HomeRecordsPagination
        totalCount={6}
        // totalCount={data?.totalElements}
        pageSize={2}
        // pageSize={pageSize}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
