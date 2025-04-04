import { useSelector } from "react-redux";
import { selectSummary } from "../summary/summarySlice";

export const useFinancialInsights = () => {
  const { totalIncome, totalExpenses, balance, budget } =
    useSelector(selectSummary);

  const warnings: string[] = [];
  const positives: string[] = [];

  const noIncome = totalIncome === 0;
  const noExpense = totalExpenses === 0;
  const noBalance = balance === 0;

  // Basic warnings
  if (noIncome) {
    warnings.push(
      "💼 You haven't added any income yet. Start by adding sources of income."
    );
  }

  if (noExpense) {
    warnings.push(
      "🧾 You haven't added any expenses. Don't forget to track your spending."
    );
  }

  // Dependent checks
  if (!noIncome && !noExpense) {
    if (totalExpenses > totalIncome) {
      warnings.push(
        "🚨 Your expenses exceed your income. You're spending more than you earn."
      );
    } else if (totalExpenses <= totalIncome * 0.7) {
      positives.push(
        "✅ Great job! You're spending less than 70% of your income."
      );
    }

    if (totalExpenses >= totalIncome * 0.9) {
      warnings.push(
        "⚠️ You're spending 90% or more of your income. Try to save more."
      );
    }
  }

  if (!noIncome && balance >= totalIncome * 0.3) {
    positives.push(
      "💰 You're maintaining a healthy balance above 30% of your income."
    );
  }

  if (!noExpense && totalExpenses < budget * 0.8) {
    positives.push("📊 You're well within your monthly budget. Keep it up!");
  }

  if (!noExpense && balance >= totalExpenses * 6) {
    positives.push(
      "🛡️ You have over 6 months of expenses saved. Great emergency fund!"
    );
  }

  if (!noExpense && balance < totalExpenses * 3) {
    warnings.push(
      "📉 Your balance is less than 3 months of expenses. Build an emergency fund."
    );
  }

  if (balance < 0) {
    warnings.push("❌ Your balance is negative. You're in financial deficit.");
  }

  if (balance > 0 && balance < budget * 0.1) {
    warnings.push(
      "⚠️ Your balance is below 10% of your budget. Monitor future expenses closely."
    );
  }

  return { warnings, positives };
};
