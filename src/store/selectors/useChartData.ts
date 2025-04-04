import { useSelector } from "react-redux";
import { selectSummary } from "../summary/summarySlice";
import { Transaction, userTransactions } from "../transactionSlice/transactionSlice";

export const useChartData = () => {
  const { totalIncome, totalExpenses, budget, balance } =
    useSelector(selectSummary);
  const transactions: Transaction[] = useSelector(userTransactions);

  const expenseCategories: Record<string, number> = {};
  const incomeCategories: Record<string, number> = {};

  transactions.forEach((txn) => {
    if (txn.type === "expense") {
      expenseCategories[txn.category] =
        (expenseCategories[txn.category] || 0) + txn.amount;
    } else if (txn.type === "income") {
        incomeCategories[txn.category] =
          (incomeCategories[txn.category] || 0) + txn.amount;
    }
  });

  const pieChartExpenseData = Object.entries(expenseCategories).map(
    ([name, value]) => ({
      name,
      value,
    })
    );
    
      const pieChartIncomeData = Object.entries(incomeCategories).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

  const dailyBudgetData = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date).toISOString().split("T")[0];
    const existing = acc.find((d) => d.date === date);

    if (!existing) {
      acc.push({
        date,
        budget: budget / 30,
        actual: txn.type === "expense" ? txn.amount : 0,
      });
    } else {
      existing.actual += txn.type === "expense" ? txn.amount : 0;
    }

    return acc;
  }, [] as { date: string; budget: number; actual: number }[]);

  dailyBudgetData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return { pieChartExpenseData, pieChartIncomeData, dailyBudgetData };
};
