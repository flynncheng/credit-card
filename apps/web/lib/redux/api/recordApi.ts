import { appConfig } from "@/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const recordApi = createApi({
  reducerPath: "recordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.api.txn}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    readRecordTransList: builder.query({
      query: ({ cardId, pageNumber, pageSize, beginTime, endTime }) => ({
        url: "/card/transaction/page",
        params: { cardId, pageNumber, pageSize, beginTime, endTime },
      }),
    }),
    readRecordTopupList: builder.query({
      query: ({ cardId, pageNumber, pageSize, beginTime, endTime }) => ({
        url: "/card/recharge-records/page",
        params: { cardId, pageNumber, pageSize, beginTime, endTime },
      }),
    }),
  }),
});

export const { useReadRecordTransListQuery, useReadRecordTopupListQuery } =
  recordApi;
