import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "../actions";
import { recordApi } from "../api/recordApi";
import type { RootState } from "../store";

export interface TransItem {
  feeAmount: number;
  feeCurrency: string;
  billConvRate: number;
  id: string;
  type: string;
  cardId: string;
  walletId: string;
  cardPan: string;
  txnCurrency: string;
  txnAmount: number;
  billingCurrency: string;
  billingAmount: number;
  cashbackAmount: number;
  cardAcceptorLocationName: string;
  cardAcceptorLocationCountry: string;
  cardAcceptorLocationCity: string;
  cardAcceptorLocationPostcode: string;
  refunded: boolean;
  rejected: boolean;
  reversed: boolean;
  status: string;
  txnInstant: string;
  updatedTime: string;
  markupAmount: number;
  rejectionReason: string;
  fxFees: number;
  handlingFees: number;
  atmFees: number;
  currencyExchangeFees: number;
  debit: string;
}

export interface TopupItem {
  feeAmount: number;
  feeCurrency: string;
  billConvRate: number;
  id: string;
  type: string;
  cardId: string;
  walletId: string;
  cardPan: string;
  txnCurrency: string;
  txnAmount: number;
  billingCurrency: string;
  billingAmount: number;
  cashbackAmount: number;
  cardAcceptorLocationName: string;
  cardAcceptorLocationCountry: string;
  cardAcceptorLocationCity: string;
  cardAcceptorLocationPostcode: string;
  refunded: boolean;
  rejected: boolean;
  reversed: boolean;
  status: string;
  txnInstant: string;
  updatedTime: string;
  markupAmount: number;
  rejectionReason: string;
  fxFees: number;
  handlingFees: number;
  atmFees: number;
  currencyExchangeFees: number;
}

// Define a type for the slice state
export interface RecordState {
  transItem: TransItem;
  transList: TransItem[];
  topupItem: TopupItem;
  topupList: TopupItem[];
}

// Define the initial state using that type
export const initialState: RecordState = {
  transItem: {
    feeAmount: 0,
    feeCurrency: "",
    billConvRate: 0,
    id: "",
    type: "",
    cardId: "",
    walletId: "",
    cardPan: "",
    txnCurrency: "",
    txnAmount: 0,
    billingCurrency: "",
    billingAmount: 0,
    cashbackAmount: 0,
    cardAcceptorLocationName: "",
    cardAcceptorLocationCountry: "",
    cardAcceptorLocationCity: "",
    cardAcceptorLocationPostcode: "",
    refunded: false,
    rejected: false,
    reversed: false,
    status: "",
    txnInstant: "",
    updatedTime: "",
    markupAmount: 0,
    rejectionReason: "",
    fxFees: 0,
    handlingFees: 0,
    atmFees: 0,
    currencyExchangeFees: 0,
    debit: "",
  },
  transList: [],
  topupItem: {
    feeAmount: 0,
    feeCurrency: "",
    billConvRate: 0,
    id: "",
    type: "",
    cardId: "",
    walletId: "",
    cardPan: "",
    txnCurrency: "",
    txnAmount: 0,
    billingCurrency: "",
    billingAmount: 0,
    cashbackAmount: 0,
    cardAcceptorLocationName: "",
    cardAcceptorLocationCountry: "",
    cardAcceptorLocationCity: "",
    cardAcceptorLocationPostcode: "",
    refunded: false,
    rejected: false,
    reversed: false,
    status: "",
    txnInstant: "",
    updatedTime: "",
    markupAmount: 0,
    rejectionReason: "",
    fxFees: 0,
    handlingFees: 0,
    atmFees: 0,
    currencyExchangeFees: 0,
  },
  topupList: [],
};

const recordSlice = createSlice({
  name: "record",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTransItem: (state, { payload }) => {
      state.transItem = payload;
    },
    setTopupItem: (state, { payload }) => {
      state.topupItem = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut, () => initialState);
    builder.addMatcher(
      recordApi.endpoints.readRecordTransList.matchFulfilled,
      (state, { payload }) => {
        state.transList = payload.content;
      },
    );
    builder.addMatcher(
      recordApi.endpoints.readRecordTopupList.matchFulfilled,
      (state, { payload }) => {
        state.topupList = payload.content;
      },
    );
  },
});

export const { setTransItem } = recordSlice.actions;

export const selectRecordTransList = (state: RootState) =>
  state.record.transList;
export const selectRecordTransItem = (state: RootState) =>
  state.record.transItem;

export default recordSlice.reducer;
