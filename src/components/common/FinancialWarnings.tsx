import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { useFinancialInsights } from "@/store/selectors/useFinancialWarnings";
import { useDispatch, useSelector } from "react-redux";
import { setSettings, showSuggestions } from "@/store/authSlice/authSlice";

const FinancialInsights = () => {
  const dispatch = useDispatch();
  const { warnings, positives } = useFinancialInsights();
  const [showWarnings, setShowWarnings] = useState(true);
  const [showPositives, setShowPositives] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const dismissed = useSelector(showSuggestions);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => clearTimeout(timer);
  }, []);

  if ((warnings.length === 0 && positives.length === 0) || dismissed)
    return null;

  return (
    <div
      className={`w-full space-y-4 mb-6 transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {warnings.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-yellow-300 shadow-sm bg-gradient-to-r from-yellow-50 to-yellow-100 transition-all duration-300 ease-in-out">
          <div
            onClick={() => setShowWarnings(!showWarnings)}
            className="p-4 cursor-pointer flex justify-between items-center group"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-600 w-5 h-5" />
              <h3 className="text-lg font-semibold text-yellow-700 group-hover:text-yellow-800 transition-colors duration-200">
                Financial Health Warnings
              </h3>
              <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                {warnings.length}
              </span>
            </div>
            {showWarnings ? (
              <ChevronUp className="text-yellow-600 group-hover:text-yellow-800 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <ChevronDown className="text-yellow-600 group-hover:text-yellow-800 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showWarnings ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-none px-4 pb-4 space-y-2">
              {warnings.map((msg, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-yellow-800 bg-yellow-100 p-3 rounded-lg border border-yellow-200"
                >
                  <span className="text-sm">{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {positives.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-green-300 shadow-sm bg-gradient-to-r from-green-50 to-green-100 transition-all duration-300 ease-in-out">
          <div
            onClick={() => setShowPositives(!showPositives)}
            className="p-4 cursor-pointer flex justify-between items-center group"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600 w-5 h-5" />
              <h3 className="text-lg font-semibold text-green-700 group-hover:text-green-800 transition-colors duration-200">
                Positive Financial Insights
              </h3>
              <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                {positives.length}
              </span>
            </div>
            {showPositives ? (
              <ChevronUp className="text-green-600 group-hover:text-green-800 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <ChevronDown className="text-green-600 group-hover:text-green-800 transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showPositives ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="list-none px-4 pb-4 space-y-2">
              {positives.map((msg, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-green-800 bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  <span className="text-sm">{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-2">
        <button
          onClick={() => dispatch(setSettings(true))}
          className="text-gray-500 cursor-pointer hover:text-gray-700 text-sm font-medium flex items-center gap-1 p-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <X size={14} />
          <span>Dismiss all</span>
        </button>
      </div>
    </div>
  );
};

export default FinancialInsights;
