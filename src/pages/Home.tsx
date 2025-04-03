import { useState, useEffect, useRef } from "react";
import {
  PlusCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  Filter,
  Menu,
} from "lucide-react";
import * as d3 from "d3";
import D3Charts from "@/components/common/ChartD3";
import Header from "@/components/common/Header";
import Cards from "@/components/common/Cards";
import BudgetProgress from "@/components/common/BudgetProgress";

const Home = () => {
  const [summary, setSummary] = useState({
    totalIncome: 5280,
    totalExpenses: 3450,
    balance: 1830,
    budget: 4000,
  });

  const [transactions, setTransactions] = useState([
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
  ]);

  const dailyBudgetData = [
    { date: "2025-04-01", budget: 133.33, actual: 150 },
    { date: "2025-04-02", budget: 133.33, actual: 80 },
    { date: "2025-04-03", budget: 133.33, actual: 90 },
    { date: "2025-04-04", budget: 133.33, actual: 200 },
    { date: "2025-04-05", budget: 133.33, actual: 110 },
    { date: "2025-04-06", budget: 133.33, actual: 60 },
    { date: "2025-04-07", budget: 133.33, actual: 120 },
    { date: "2025-04-08", budget: 133.33, actual: 130 },
    { date: "2025-04-09", budget: 133.33, actual: 145 },
    { date: "2025-04-10", budget: 133.33, actual: 80 },
    { date: "2025-04-11", budget: 133.33, actual: 70 },
    { date: "2025-04-12", budget: 133.33, actual: 190 },
    { date: "2025-04-13", budget: 133.33, actual: 50 },
    { date: "2025-04-14", budget: 133.33, actual: 120 },
  ];

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "",
    date: "",
    amount: "",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const budgetProgress = Math.min(
    100,
    (summary.totalExpenses / summary.budget) * 100
  );
  const budgetProgressColor =
    budgetProgress < 70
      ? "bg-green-500"
      : budgetProgress < 90
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Cards summary={summary} />

          <BudgetProgress
            currentAmount={summary.totalExpenses}
            totalBudget={summary.budget}
            title="Monthly Budget Progress"
            showPercentages={true}
            showAmounts={true}
            height="md"
            colorThresholds={{ safe: 60, warning: 80, danger: 90 }}
            className="mb-8"
          />

          {/* Charts Section */}
          <div className="w-full">
            <D3Charts />
          </div>

          {/* Recent Transactions Preview */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <button
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setActiveTab("transactions")}
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.slice(0, 3).map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type === "income" ? "Income" : "Expense"}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
