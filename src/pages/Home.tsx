import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { DollarSign, PlusCircle, MinusCircle, Wallet } from "lucide-react";
import SummaryCard from "@/components/common/SummaryCard";
import Header from "@/components/common/Header";
import Transactions from "@/components/common/Transactions";
import Charts from "@/components/common/Charts";

const data2 = [
  {
    id: 1,
    type: "income",
    category: "Salary",
    amount: 5000,
    date: "2025-04-01",
  },
  {
    id: 2,
    type: "income",
    category: "Freelance",
    amount: 280,
    date: "2025-04-02",
  },
  {
    id: 3,
    type: "expense",
    category: "Rent",
    amount: 1500,
    date: "2025-04-01",
  },
  {
    id: 4,
    type: "expense",
    category: "Groceries",
    amount: 450,
    date: "2025-04-03",
  },
  {
    id: 5,
    type: "expense",
    category: "Entertainment",
    amount: 200,
    date: "2025-04-04",
  },
  {
    id: 6,
    type: "expense",
    category: "Utilities",
    amount: 300,
    date: "2025-04-02",
  },
  {
    id: 7,
    type: "expense",
    category: "Transport",
    amount: 250,
    date: "2025-04-03",
  },
  {
    id: 8,
    type: "expense",
    category: "Shopping",
    amount: 350,
    date: "2025-04-05",
  },
  {
    id: 9,
    type: "expense",
    category: "Healthcare",
    amount: 400,
    date: "2025-04-04",
  },
];

const Home = () => {
  const [summary, setSummary] = useState({
    totalIncome: 5280,
    totalExpenses: 3450,
    balance: 1830,
    budget: 4000,
  });

  const [transactions, setTransactions] = useState(data2);


  // Calculate expense categories for pie chart
  const expenseCategories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

  const pieChartData = Object.keys(expenseCategories).map((category) => ({
    name: category,
    value: expenseCategories[category],
  }));



  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <SummaryCard
              title="Total Income"
              value={summary.totalIncome}
              icon={<PlusCircle className="text-green-600" />}
              bgColor="bg-green-50"
              textColor="text-green-800"
            />
            <SummaryCard
              title="Total Expenses"
              value={summary.totalExpenses}
              icon={<MinusCircle className="text-red-600" />}
              bgColor="bg-red-50"
              textColor="text-red-800"
            />
            <SummaryCard
              title="Balance"
              value={summary.balance}
              icon={<Wallet className="text-blue-600" />}
              bgColor="bg-blue-50"
              textColor="text-blue-800"
            />
            <SummaryCard
              title="Monthly Budget"
              value={summary.budget}
              icon={<DollarSign className="text-purple-600" />}
              bgColor="bg-purple-50"
              textColor="text-purple-800"
            />
          </div>

          {/* Charts Section */}
          <Charts pieChartData={pieChartData} />

          <Transactions transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default Home;
