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
  transactions:[]
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.date !== action.payload
      );
    },
  },
});

// Selectors
export const userTransactions = (state: RootState) =>
  state.transactions.transactions;

export const { addTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;



//   [
  //   {
  //     type: "income",
  //     category: "Salary",
  //     amount: 5000,
  //     date: "2025-04-01",
  //   },
  //   {
  //     type: "income",
  //     category: "Freelance",
  //     amount: 280,
  //     date: "2025-04-02",
  //   },
  //   {
  //     type: "expense",
  //     category: "Rent",
  //     amount: 1500,
  //     date: "2025-04-01",
  //   },
  //   {
  //     type: "expense",
  //     category: "Groceries",
  //     amount: 450,
  //     date: "2025-04-03",
  //   },
  //   {
  //     type: "expense",
  //     category: "Entertainment",
  //     amount: 200,
  //     date: "2025-04-04",
  //   },
  //   {
  //     type: "expense",
  //     category: "Utilities",
  //     amount: 300,
  //     date: "2025-04-02",
  //   },
  //   {
  //     type: "expense",
  //     category: "Transport",
  //     amount: 250,
  //     date: "2025-04-03",
  //   },
  //   {
  //     type: "expense",
  //     category: "Shopping",
  //     amount: 350,
  //     date: "2025-04-05",
  //   },
  //   {
  //     type: "expense",
  //     category: "Healthcare",
  //     amount: 400,
  //     date: "2025-04-04",
  //   },
  // ],