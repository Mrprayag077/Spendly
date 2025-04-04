import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice/transactionSlice";
import summaryReducer from "./summary/summarySlice";
import authReducer from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    summary: summaryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
