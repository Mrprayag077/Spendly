import { useSelector } from "react-redux";
import { selectSummary } from "../summary/summarySlice";

export const useFinancialWarnings = () => {
  const { totalIncome, totalExpenses, balance, budget } =
    useSelector(selectSummary);
  const warnings: string[] = [];

  if (totalIncome === 0) {
    warnings.push(
      "You haven't added any income yet. Start by adding your sources of income."
    );
  }

  if (totalExpenses === 0) {
    warnings.push(
      "You haven't added any expenses. Don't forget to track your spending."
    );
  }

  if (totalExpenses > totalIncome) {
    warnings.push(
      "🚨 Your expenses exceed your income. You're spending more than you earn."
    );
  }

  if (totalExpenses >= totalIncome * 0.9) {
    warnings.push(
      "⚠️ You're spending 90% or more of your income. Try to save more."
    );
  }

  if (balance < totalIncome * 0.1) {
    warnings.push(
      "⚠️ Your balance is below 10% of your income. Consider cutting expenses."
    );
  }

  if (totalExpenses >= budget * 0.9) {
    warnings.push(
      "💡 You've used over 90% of your monthly budget. Review spending habits."
    );
  }

  if (balance < totalExpenses * 3 && totalExpenses !== 0) {
    warnings.push(
      "📉 Your balance is less than 3 months of expenses. Build an emergency fund."
    );
  }

  if (balance < 0) {
    warnings.push("❌ Your balance is negative. You're in financial deficit.");
  }

  if (balance < budget * 0.1) {
    warnings.push(
      "⚠️ Your balance is below 10% of your budget. Monitor future expenses closely."
    );
  }

  return warnings;
};
