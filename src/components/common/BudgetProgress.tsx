import React from "react";

type BudgetProgressProps = {
  currentAmount: number;
  totalBudget: number;
  title?: string;
  showPercentages?: boolean;
  showAmounts?: boolean;
  height?: "sm" | "md" | "lg";
  colorThresholds?: {
    safe: number;
    warning: number;
    danger: number;
  };
  className?: string;
};

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  currentAmount,
  totalBudget,
  title = "Monthly Budget Progress",
  showPercentages = true,
  showAmounts = true,
  height = "md",
  colorThresholds = { safe: 60, warning: 80, danger: 90 },
  className = "",
}) => {
  // Calculate budget progress percentage
  const budgetProgress = Math.min((currentAmount / totalBudget) * 100, 100);

  // Determine progress bar color based on percentage
  const getBudgetProgressColor = () => {
    if (budgetProgress >= colorThresholds.danger) return "bg-red-500";
    if (budgetProgress >= colorThresholds.warning) return "bg-yellow-500";
    if (budgetProgress >= colorThresholds.safe) return "bg-blue-500";
    return "bg-green-500";
  };

  // Determine progress bar height
  const getProgressHeight = () => {
    switch (height) {
      case "sm":
        return "h-2";
      case "lg":
        return "h-6";
      default:
        return "h-4";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const progressHeight = getProgressHeight();
  const progressColor = getBudgetProgressColor();

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showAmounts && (
          <div className="flex items-center text-sm">
            <span className="text-gray-500">
              {formatCurrency(currentAmount)} of {formatCurrency(totalBudget)}
            </span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                budgetProgress >= colorThresholds.danger
                  ? "bg-red-100 text-red-800"
                  : budgetProgress >= colorThresholds.warning
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {budgetProgress >= colorThresholds.danger
                ? "Over Budget"
                : budgetProgress >= colorThresholds.warning
                ? "Caution"
                : "On Track"}
            </span>
          </div>
        )}
      </div>

      <div className="relative w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`${progressHeight} rounded-full ${progressColor} transition-all duration-500 ease-in-out`}
          style={{ width: `${budgetProgress}%` }}
        >
          {height === "lg" && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {budgetProgress.toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {showPercentages && (
        <div className="flex justify-between mt-2 text-sm">
          <p className="text-gray-600 font-medium">
            {budgetProgress.toFixed(1)}% spent
          </p>
          <p
            className={`font-medium ${
              100 - budgetProgress < 10 ? "text-red-600" : "text-green-600"
            }`}
          >
            {(100 - budgetProgress).toFixed(1)}% remaining
          </p>
        </div>
      )}

      {/* Optional budget milestones */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>Start</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Usage example
const BudgetProgressExample: React.FC = () => {
  const summary = {
    totalExpenses: 3200,
    budget: 5000,
  };

  return (
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
  );
};

export default BudgetProgress;
