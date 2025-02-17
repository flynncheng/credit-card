import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "../actions";
import { kycApi } from "../api/kycApi";
import type { RootState } from "../store";

export enum IdType {
  NationalID = "NationalID",
  Passport = "Passport",
}

// Define a type for the slice state
export interface KycState {
  verification: {
    status: string | null;
    resultCode: string | null;
  };
  formValues: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    idType: IdType | "";
    idNumber: string;
    idDocumentFrontUrl: string;
    idDocumentBackUrl: string;
  };
}

// Define the initial state using that type
export const initialState: KycState = {
  verification: {
    status: null,
    resultCode: null,
  },
  formValues: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    idType: "",
    idNumber: "",
    idDocumentFrontUrl: "",
    idDocumentBackUrl: "",
  },
};

const kycSlice = createSlice({
  name: "kyc",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setKycFormValues: (state, { payload }) => {
      state.formValues = { ...state.formValues, ...payload.formValues };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut, () => initialState);
    builder.addMatcher(
      kycApi.endpoints.readKycVerification.matchFulfilled,
      (state, { payload }) => {
        state.verification.status = payload.data.status;
        state.verification.resultCode = payload.data.resultCode;
      },
    );
  },
});

export const { setKycFormValues } = kycSlice.actions;

export const selectKycVerification = (state: RootState) =>
  state.kyc.verification;
export const selectKycFormValues = (state: RootState) => state.kyc.formValues;

export default kycSlice.reducer;
