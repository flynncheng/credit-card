import { appConfig } from "@/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const kycApi = createApi({
  reducerPath: "kycApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.api.user}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["KYC_FORM_VALUES"],
  endpoints: (builder) => ({
    createKycFormValues: builder.mutation({
      query: (body) => ({
        url: "/v1/kyc/draft",
        method: "POST",
        body,
      }),
    }),
    createKycDocument: builder.mutation({
      query: (body) => ({
        url: "/kyc/upload",
        method: "POST",
        body,
      }),
    }),
    createKyc: builder.mutation({
      query: (body) => ({
        url: "/kyc/v3",
        method: "POST",
        body,
      }),
    }),
    createKycRejected: builder.mutation({
      query: (body) => ({
        url: "/kyc/v3/resubmit",
        method: "POST",
        body,
      }),
    }),
    readKycVerification: builder.query({
      query: (kycProvider) => ({
        url: "/kyc",
        params: { kycProvider },
      }),
    }),
    readKycFormValues: builder.query({
      query: (kycProvider) => ({
        url: "/v1/kyc/draft",
        params: { kycProvider },
      }),
      providesTags: [{ type: "KYC_FORM_VALUES" }],
    }),
    updateKycFormValues: builder.mutation({
      query: (body) => ({
        url: "/v1/kyc/draft",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "KYC_FORM_VALUES" }],
    }),
  }),
});

export const {
  useCreateKycFormValuesMutation,
  useCreateKycDocumentMutation,
  useCreateKycMutation,
  useCreateKycRejectedMutation,
  useReadKycVerificationQuery,
  useReadKycFormValuesQuery,
  useUpdateKycFormValuesMutation,
} = kycApi;
