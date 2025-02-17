import { appConfig } from "@/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.api.card}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["CARD_LOCK_STATUS"],
  endpoints: (builder) => ({
    readCardList: builder.query({
      query: (cardProvider) => ({
        url: "/card",
        params: { cardProvider },
      }),
      providesTags: [{ type: "CARD_LOCK_STATUS" }],
    }),
    readCardBalance: builder.query({
      query: (cardId) => ({
        url: `/card/${cardId}/available-balance`,
      }),
    }),
    readCardMonthlyToppedUp: builder.query({
      query: (cardId) => ({
        url: `/card/${cardId}/monthly-recharged`,
      }),
    }),
    readCardDetails: builder.query({
      query: (cardId) => ({
        url: `/card/${cardId}/secure-info`,
      }),
    }),
    createCardApply: builder.mutation({
      query: (body) => ({
        url: `/card`,
        method: "POST",
        body,
      }),
    }),
    createCardTopup: builder.mutation({
      query: ({ cardId, body }) => ({
        url: `/card/${cardId}/recharge`,
        method: "POST",
        body,
      }),
    }),
    readCardLockOtp: builder.query({
      query: (cardId) => ({
        url: `/card/${cardId}/lock-otp`,
      }),
    }),
    updateCardLockOtp: builder.mutation({
      query: (cardId) => ({
        url: `/card/${cardId}/lock-otp`,
      }),
    }),
    updateCardLock: builder.mutation({
      query: ({ cardId, body }) => ({
        url: `/card/${cardId}/lock`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CARD_LOCK_STATUS" }],
    }),
    readCardUnlockOtp: builder.query({
      query: (cardId) => ({
        url: `/card/${cardId}/unlock-otp`,
      }),
    }),
    updateCardUnlockOtp: builder.mutation({
      query: (cardId) => ({
        url: `/card/${cardId}/unlock-otp`,
      }),
    }),
    updateCardUnlock: builder.mutation({
      query: ({ cardId, body }) => ({
        url: `/card/${cardId}/unlock`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CARD_LOCK_STATUS" }],
    }),
  }),
});

export const {
  useReadCardListQuery,
  useLazyReadCardBalanceQuery,
  useReadCardMonthlyToppedUpQuery,
  useLazyReadCardDetailsQuery,
  useCreateCardApplyMutation,
  useCreateCardTopupMutation,
  useLazyReadCardLockOtpQuery,
  useUpdateCardLockOtpMutation,
  useUpdateCardLockMutation,
  useLazyReadCardUnlockOtpQuery,
  useUpdateCardUnlockOtpMutation,
  useUpdateCardUnlockMutation,
} = cardApi;
