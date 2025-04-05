import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  isAuthenticated: boolean;
  user: { uuid: string | null; name: string | null; email: string | null };
  settings: { showSuggestions: boolean };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: { uuid: null, name: null, email: null },
  settings: { showSuggestions: false },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        uuid: string;
        name: string | null;
        email: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { uuid: null, name: null, email: null };
    },
    setSettings: (state, action: PayloadAction<boolean>) => {
      state.settings.showSuggestions = action.payload;
    },
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const showSuggestions = (state: RootState) =>
  state.auth.settings.showSuggestions;
export const auth = (state: RootState) => state.auth;

export const { login, logout, setSettings } = authSlice.actions;
export default authSlice.reducer;
