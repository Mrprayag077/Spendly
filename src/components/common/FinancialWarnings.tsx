import { useFinancialWarnings } from "@/store/selectors/useFinancialWarnings";

const FinancialWarnings = () => {
  const warnings = useFinancialWarnings();

  if (warnings.length === 0) return null;

  return (
    <div className="w-full p-4 mt-2 mb-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm space-y-2">
      <h3 className="text-lg font-semibold text-yellow-700">
        ⚠️ Financial Health Warnings
      </h3>
      <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
        {warnings.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialWarnings;
