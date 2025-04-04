import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface SummaryState {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  budget: number;
}

const initialState: SummaryState = {
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  budget: 1,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});

export default summarySlice.reducer;
export const { setBudget } = summarySlice.actions;
export const selectSummary = (state: RootState) => state.summary;
