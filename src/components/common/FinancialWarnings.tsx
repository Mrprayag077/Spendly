import { useFinancialInsights } from "@/store/selectors/useFinancialWarnings";

const FinancialInsights = () => {
  const { warnings, positives } = useFinancialInsights();

  if (warnings.length === 0 && positives.length === 0) return null;

  return (
    <div className="w-full space-y-4 mb-4">
      {warnings.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-yellow-700">
            ⚠️ Financial Health Warnings
          </h3>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            {warnings.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {positives.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-300 rounded-xl shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-green-700">
            ✅ Positive Financial Insights
          </h3>
          <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
            {positives.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FinancialInsights;
