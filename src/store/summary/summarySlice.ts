import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { addTransaction, removeTransaction, Transaction } from "../transactionSlice/transactionSlice";

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
    builder
      .addCase(addTransaction, (state, action) => {
        const transaction: Transaction = action.payload;
        if (transaction.amount === 0) return;

        if (transaction.type === "income") {
          state.totalIncome += transaction.amount;
        } else {
          state.totalExpenses += transaction.amount;
        }
        // state.balance = Math.max(0, state.totalIncome - state.totalExpenses);
        state.balance = state.totalIncome - state.totalExpenses;
      })
      .addCase(
        removeTransaction,
        (state, action: PayloadAction<Transaction>) => {
          const transaction: Transaction = action.payload;
          if (transaction.amount === 0) return;

          if (transaction.type === "income") {
            state.totalIncome = Math.max(
              0,
              state.totalIncome - transaction.amount
            );
          } else {
            state.totalExpenses = Math.max(
              0,
              state.totalExpenses - transaction.amount
            );
          }
          state.balance = Math.max(0, state.totalIncome - state.totalExpenses);
        }
      );
  },
});

export default summarySlice.reducer;
export const { setBudget } = summarySlice.actions;
export const selectSummary = (state: RootState) => state.summary;
