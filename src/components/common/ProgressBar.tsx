import React, { useState, useEffect } from "react";

const AnimatedProgressBar = ({
  value = 65,
  maxValue = 100,
  label = "Progress",
  theme = "gradient",
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Themes for the progress bar
  const themes = {
    gradient: "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500",
    success: "bg-gradient-to-r from-green-400 to-emerald-500",
    warning: "bg-gradient-to-r from-yellow-300 to-amber-500",
    danger: "bg-gradient-to-r from-orange-400 to-red-500",
  };

  // Choose theme based on value (optional logic)
  const getThemeClass = () => {
    if (value >= 80) return themes.success;
    if (value >= 50) return themes.gradient;
    if (value >= 30) return themes.warning;
    return themes.danger;
  };

  // Animate the progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min(
    100,
    Math.max(0, (currentValue / maxValue) * 100)
  );

  return (
    <div className="w-full mb-6 mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">{label}</span>
          <div className="px-2 py-1 rounded-md bg-gray-100 text-sm font-medium">
            {Math.round(percentage)}%
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {currentValue} / {maxValue}
        </div>
      </div>

      <div
        className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`h-full ${getThemeClass()} transition-all duration-1000 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated pulse effect when hovered */}
          {hovered && (
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          )}

          {/* Animated sparkles effect */}
          <div
            className="absolute top-0 right-0 h-full w-4 bg-white opacity-30 
                         animate-[shimmer_1.5s_infinite]"
            style={{
              animation: "shimmer 1.5s infinite",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              transform: "skewX(-20deg)",
            }}
          ></div>
        </div>

        {/* Progress markers */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          {[25, 50, 75].map((marker) => (
            <div
              key={marker}
              className={`h-2 w-0.5 ${
                percentage >= marker ? "bg-white" : "bg-gray-400"
              } opacity-70`}
              style={{
                marginLeft: `${marker}%`,
                transform: "translateX(-50%)",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Milestone indicators below progress bar */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Start</span>
        <span>Halfway</span>
        <span>Goal</span>
      </div>
    </div>
  );
};

// Demo component with multiple progress bars
const ProgressSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full rounded-xl shadow-sm p-4 transition-all hover:shadow-md mb-4 bg-purple-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Progress Tracker</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          {expanded ? "Show Less" : "Show Details"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <AnimatedProgressBar
        value={65}
        maxValue={100}
        label="Overall Completion"
      />

      {expanded && (
        <div className="space-y-4 mt-4 pt-4 border-t border-gray-100">
          <AnimatedProgressBar
            value={80}
            maxValue={100}
            label="Budget Utilization"
            theme="success"
          />
          <AnimatedProgressBar
            value={45}
            maxValue={100}
            label="Time Spent"
            theme="warning"
          />
          <AnimatedProgressBar
            value={25}
            maxValue={100}
            label="Resources Allocated"
            theme="danger"
          />
        </div>
      )}
    </div>
  );
};

export default ProgressSection;
