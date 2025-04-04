import React, { useState } from "react";
import Header from "@/components/common/Header";
import Transactions from "@/components/common/Transactions";
import Charts from "@/components/common/Charts";
import SummaryCard from "@/components/common/SummaryCard";
import { ProfileIcon } from "@/utils/Profile";
import ProgressSection from "@/components/common/ProgressBar";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice/authSlice";
import { userTransactions } from "@/store/transactionSlice/transactionSlice";
import { selectSummary } from "@/store/summary/summarySlice";
import FinancialWarnings from "@/components/common/FinancialWarnings";

const Home: React.FC = () => {
  const userName = useSelector(selectUser);
  const transactions = useSelector(userTransactions);
  const summary = useSelector(selectSummary);

  const expenseCategories: Record<string, number> = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieChartData = Object.keys(expenseCategories).map((category) => ({
    name: category,
    value: expenseCategories[category],
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FinancialWarnings />

          <div className="bg-white rounded-2xl shadow-xs p-2 lg:p-6 transition-all duration-500 mb-4">
            <div className="flex justify-between items-center -md:mb-2">
              <div className="flex justify-center items-center space-x-3 mb-4">
                {userName && userName.name ? (
                  <ProfileIcon name={userName.name} />
                ) : (
                  <ProfileIcon name="User" />
                )}
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {userName?.name}
                </h1>
              </div>
            </div>

            <SummaryCard summary={summary} />
            <ProgressSection />
            <Charts />
          </div>

          <Transactions />
        </div>
      </main>
    </div>
  );
};

export default Home;
