import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "../actions";
import { authApi } from "../api/authApi";
import type { RootState } from "../store";

// Define a type for the slice state
export interface AuthState {
  userEmail: string;
  userId: string | null;
  token: string | null;
  isAuthenticated: boolean | null;
  isSessionActive: boolean | null;
}

// Define the initial state using that type
export const initialState: AuthState = {
  userEmail: "",
  userId: null,
  token: null,
  isAuthenticated: null,
  isSessionActive: null,
};

const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserEmail: (state, { payload }) => {
      state.userEmail = payload.userEmail;
    },
    setSessionExpired: (state) => {
      state.isSessionActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut, () => ({
      ...initialState,
      isAuthenticated: false,
    }));
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.userId = payload.data.userId;
        state.token = payload.data.token;
        state.isAuthenticated = true;
        state.isSessionActive = true;
      },
    );
  },
});

export const { setUserEmail, setSessionExpired } = authSlice.actions;

export const selectUserEmail = (state: RootState) => state.auth.userEmail;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsSessionActive = (state: RootState) =>
  state.auth.isSessionActive;

export default authSlice.reducer;
