import { appConfig } from "@/app.config";
import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "../actions";
import { cardApi } from "../api/cardApi";
import type { RootState } from "../store";

const topupMin = appConfig.app.topupMin;
const topupFee = appConfig.app.topupFee;

export interface CardItem {
  currency: string;
  expiryDate: string;
  id: string;
  nameOnCard: string;
  pan: string;
  status: "ACTIVE" | "INACTIVE" | "LOCKED" | "";
  type: "Virtual" | "PHYSICAL_CARD" | "";
}

export interface Topup {
  amountPay: number;
  amountReceive: number;
  fee: number;
  currencyPay: "USDT-ERC20" | "USDC-ERC20" | "USDT-TRC20";
  currencyReceive: "USD";
}

// Define a type for the slice state
export interface CardState {
  control: {
    lockOtp: string;
    unlockOtp: string;
  };
  topup: Topup;
  item: CardItem;
  list: CardItem[];
  payment: {
    apply: string;
    topup: string;
  };
}

// Define the initial state using that type
export const initialState: CardState = {
  control: {
    lockOtp: "",
    unlockOtp: "",
  },
  topup: {
    amountReceive: topupMin,
    amountPay: topupMin * (1 + topupFee),
    fee: topupFee,
    currencyReceive: "USD",
    currencyPay: "USDT-ERC20",
  },
  item: {
    currency: "",
    expiryDate: "",
    id: "",
    nameOnCard: "",
    pan: "",
    status: "",
    type: "",
  },
  list: [],
  payment: {
    apply: "",
    topup: "",
  },
};

const cardSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCardItem: (state, { payload }) => {
      state.item = payload;
    },
    setCardTopup: (state, { payload }) => {
      state.topup = { ...state.topup, ...payload.topup };
    },
    setCardControl: (state, { payload }) => {
      state.control = { ...state.control, ...payload.control };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut, () => initialState);
    builder.addMatcher(
      cardApi.endpoints.readCardList.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.data.cards;
      },
    );
    builder.addMatcher(
      cardApi.endpoints.createCardApply.matchFulfilled,
      (state, { payload }) => {
        state.payment.apply = payload.data.cashierUrl;
      },
    );
    builder.addMatcher(
      cardApi.endpoints.createCardTopup.matchFulfilled,
      (state, { payload }) => {
        state.payment.topup = payload.data.cashierUrl;
      },
    );
  },
});

export const { setCardItem, setCardTopup, setCardControl } = cardSlice.actions;

export const selectCardTopup = (state: RootState) => state.card.topup;
export const selectCardList = (state: RootState) => state.card.list;
export const selectCardItem = (state: RootState) => state.card.item;
export const selectCardPayment = (state: RootState) => state.card.payment;
export const selectCardControl = (state: RootState) => state.card.control;

export default cardSlice.reducer;
