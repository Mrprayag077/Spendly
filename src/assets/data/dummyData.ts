import { Transaction } from "@/store/transactionSlice/transactionSlice";

export const dummyTransactions: Transaction[] = [
  // { type: "income", category: "Salary", amount: 100, date: "2025-04-01" },
  // { type: "income", category: "Freelance", amount: 280, date: "2025-04-02" },
  // { type: "income", category: "Home", amount: 280, date: "2025-04-02" },
  // { type: "income", category: "Home", amount: 2000, date: "2025-04-20" },
  // { type: "expense", category: "Rent", amount: 500, date: "2025-04-01" },
  // { type: "expense", category: "Groceries", amount: 450, date: "2025-04-03" },
  // {
  //   type: "expense",
  //   category: "Entertainment",
  //   amount: 200,
  //   date: "2025-04-04",
  // },
  // { type: "expense", category: "Utilities", amount: 300, date: "2025-04-02" },
];

export const dummyDatt: { profile: any; transactions: Record<string, Transaction> } = {
  profile: {
    balance: 0,
    budget: 1,
    email: "test_user@prayag.com",
    name: "John Doe",
    totalExpenses: 0,
    totalIncome: "1002",
  },
  transactions: {
    "txn-456": {
      amount: 100,
      category: "Food",
      date: "2025-04-05",
      type: "USD",
    },
    txn0011: {
      amount: 1001,
      category: "Food1",
      date: "2025-04-05",
      type: "Lunch",
    },
    txnId1: {
      amount: 100,
      category: "Salary",
      date: "2025-04-01",
      type: "income",
    },
    txnId2: {
      amount: 280,
      category: "Freelance",
      date: "2025-04-02",
      type: "income",
    },
    txnId3: {
      amount: 2000,
      category: "Home",
      date: "2025-04-20",
      type: "income",
    },
    txnId4: {
      amount: 500,
      category: "Rent",
      date: "2025-04-01",
      type: "expense",
    },
    txnId5: {
      amount: 450,
      category: "Groceries",
      date: "2025-04-03",
      type: "expense",
    },
  },
};