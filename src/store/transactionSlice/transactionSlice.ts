import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type categoryType = "income" | "expense";

export interface Transaction {
  amount: number;
  category: categoryType | string;
  date: string;
  type: string;
  id: string;
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
  budget: 0,
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
    editTransaction: (
      state,
      action: PayloadAction<{ id: string; transaction: Transaction }>
    ) => {
      const { id, transaction } = action.payload;

      const existingTransaction = state.transactions[id];

      if (existingTransaction) {
        // Step 1: Subtract old transaction from totals
        if (existingTransaction.type === "income") {
          state.totalIncome -= existingTransaction.amount;
          state.balance -= existingTransaction.amount;
        } else if (existingTransaction.type === "expense") {
          state.totalExpenses -= existingTransaction.amount;
          state.balance += existingTransaction.amount;
        }
      }

      // Step 2: Update transaction
      state.transactions[id] = transaction;

      // Step 3: Add new transaction values to totals
      if (transaction.type === "income") {
        state.totalIncome += transaction.amount;
        state.balance += transaction.amount;
      } else if (transaction.type === "expense") {
        state.totalExpenses += transaction.amount;
        state.balance -= transaction.amount;
      }
    },
  },
});

export const {
  setBudget,
  addTransaction,
  removeTransaction,
  removeAllTransaction,
  editTransaction,
} = appSlice.actions;

export default appSlice.reducer;

// Selectors
export const selectTransactions = (state: RootState) => state.app.transactions;
const selectAppState = (state: RootState) => state.app;

export const selectSummary = createSelector([selectAppState], (app) => ({
  totalIncome: app.totalIncome,
  totalExpenses: app.totalExpenses,
  balance: app.balance,
  budget: app.budget,
}));



