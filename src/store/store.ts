import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice/transactionSlice";
import authReducer from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    app: transactionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
