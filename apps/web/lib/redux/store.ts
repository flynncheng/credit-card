import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { authApi } from "./api/authApi";
import { cardApi } from "./api/cardApi";
import { kycApi } from "./api/kycApi";
import { recordApi } from "./api/recordApi";
import { rtkQueryErrorHandler } from "./middleware";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";
import kycReducer from "./slices/kycSlice";
import recordReducer from "./slices/recordSlice";
import { createPersistStorage } from "./storage";

const authPersistConfig = {
  key: "auth",
  storage: createPersistStorage(),
};

const kycPersistConfig = {
  key: "kyc",
  storage: createPersistStorage(),
  // whitelist: ["formValues"],
};

const cardPersistConfig = {
  key: "card",
  storage: createPersistStorage(),
};

const recordPersistConfig = {
  key: "record",
  storage: createPersistStorage(),
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedKycReducer = persistReducer(kycPersistConfig, kycReducer);
const persistedCardReducer = persistReducer(cardPersistConfig, cardReducer);
const persistedRecordReducer = persistReducer(
  recordPersistConfig,
  recordReducer,
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  kyc: persistedKycReducer,
  card: persistedCardReducer,
  record: persistedRecordReducer,
  [authApi.reducerPath]: authApi.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
  [cardApi.reducerPath]: cardApi.reducer,
  [recordApi.reducerPath]: recordApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(cardApi.middleware)
      .concat(kycApi.middleware)
      .concat(recordApi.middleware)
      .concat(rtkQueryErrorHandler),
});

export const persistor = persistStore(store);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
