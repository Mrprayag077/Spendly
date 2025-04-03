import { useState, useEffect } from "react";

const AnimatedProgressBar = ({
  value = 65,
  maxValue = 100,
  label = "Progress",
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hovered, setHovered] = useState(false);

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
    <div className="w-full mb-2 mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-800">{label}</span>
        <div className="px-3 py-1 rounded-lg bg-gray-900 text-white text-sm font-medium">
          {Math.round(percentage)}%
        </div>
      </div>

      <div
        className="relative w-full h-5 bg-gray-300 rounded-full overflow-hidden shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="h-full transition-all duration-1000 ease-out relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
          style={{
            width: `${percentage}%`,
            boxShadow: hovered ? "0px 0px 15px rgba(255, 255, 255, 0.8)" : "",
          }}
        ></div>

        <div
          className="absolute top-0 right-0 h-full w-6 opacity-40 animate-[shimmer_1.5s_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent, white, transparent)",
            transform: "skewX(-20deg)",
          }}
        ></div>
      </div>

      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Start</span>
        <span>50%</span>
        <span>End</span>
      </div>
    </div>
  );
};

const ProgressSection = () => {
  return (
    <div className="w-full rounded-xl shadow-md p-6 bg-gradient-to-br from-purple-50 to-indigo-100 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 Progress</h2>

      <AnimatedProgressBar value={75} maxValue={100} label="Overall Progress" />
    </div>
  );
};

export default ProgressSection;
