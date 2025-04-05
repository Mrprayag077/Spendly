import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type categoryType = "income" | "expense";

export interface Transaction {
  type: categoryType;
  category: string;
  amount: number;
  date: string;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = state.transactions.filter(
        (t) => t.date !== action.payload.date
      );
    },
    removeAllTransaction: (state) => {
      state.transactions = [];
    },
  },
});

// Selectors
export const userTransactions = (state: RootState) =>
  state.transactions.transactions;

export const { addTransaction, removeTransaction, removeAllTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
