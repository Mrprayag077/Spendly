import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface SummaryState {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  budget: number;
}

const initialState: SummaryState = {
  totalIncome: 5280,
  totalExpenses: 3450,
  balance: 1830,
  budget: 20000,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});


export default summarySlice.reducer;
export const selectSummary = (state: RootState) => state.summary;
