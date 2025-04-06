import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { transactionApi, transactionApiProps } from "@/services/api";

export type categoryType = "income" | "expense";

export interface Transaction {
  amount: number;
  category: categoryType | string;
  date: string;
  type: string;
}

interface AppState {
  transactions: Record<string, Transaction>;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  budget: number;
}

const initialState: AppState = {
  transactions: {},
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
  budget: 1,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    addTransaction: (
      state,
      action: PayloadAction<{ id: string; transaction: Transaction }>
    ) => {
      const { id, transaction } = action.payload;
      state.transactions[id] = transaction;

      if (transaction.amount === 0) return;

      if (transaction.type === "income") {
        state.totalIncome += transaction.amount;
      } else {
        state.totalExpenses += transaction.amount;
      }

      state.balance = state.totalIncome - state.totalExpenses;
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const transaction = state.transactions[id];

      if (!transaction || transaction.amount === 0) return;

      if (transaction.type === "income") {
        state.totalIncome = Math.max(0, state.totalIncome - transaction.amount);
      } else {
        state.totalExpenses = Math.max(
          0,
          state.totalExpenses - transaction.amount
        );
      }

      state.balance = Math.max(0, state.totalIncome - state.totalExpenses);

      delete state.transactions[id];
    },
    removeAllTransaction: (state) => {
      state.transactions = {};
      state.totalIncome = 0;
      state.totalExpenses = 0;
      state.balance = 0;
    },
  },
});

export const {
  setBudget,
  addTransaction,
  removeTransaction,
  removeAllTransaction,
} = appSlice.actions;

export default appSlice.reducer;

// Selectors
export const selectTransactions = (state: RootState) => state.app.transactions;
export const selectSummary = (state: RootState) => ({
  totalIncome: state.app.totalIncome,
  totalExpenses: state.app.totalExpenses,
  balance: state.app.balance,
  budget: state.app.budget,
});

