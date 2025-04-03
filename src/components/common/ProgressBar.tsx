import React, { useState, useEffect } from "react";

const AnimatedProgressBar = ({
  value = 65,
  maxValue = 100,
  label = "Progress",
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [sparkleCount, setSparkleCount] = useState(3);

  useEffect(() => {
    let start = 0;
    const increment = value / 30; // Smoother increments
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(timer);
        setCurrentValue(value);
      } else {
        setCurrentValue(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  useEffect(() => {
    if (hovered) {
      const interval = setInterval(() => {
        setSparkleCount(Math.floor(Math.random() * 5) + 2);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  const percentage = Math.min(
    100,
    Math.max(0, (currentValue / maxValue) * 100)
  );

  return (
    <div className="w-full mb-6 mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">{label}</span>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {currentValue.toFixed(1)} / {maxValue}
        </div>
      </div>

      <div
        className="w-full h-6 bg-gray-200 rounded-full overflow-hidden relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gray-100 animate-pulse opacity-50"></div>

        {/* Main progress bar */}
        <div
          className={`h-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 transition-all duration-700 ease-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-y-0 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                animation: "wave 2s ease-in-out infinite",
                backgroundSize: "200% 100%",
              }}
            ></div>
          </div>

          {/* Multiple sparkle effects */}
          {[...Array(sparkleCount)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-3 bg-white opacity-30"
              style={{
                left: `${(i * 100) / sparkleCount}%`,
                animation: `shimmer ${1 + (i % 3) * 0.5}s infinite ${i * 0.2}s`,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                transform: "skewX(-20deg)",
              }}
            ></div>
          ))}
        </div>

        {/* Progress markers */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          {[20, 40, 60, 80].map((marker) => (
            <div
              key={marker}
              className={`h-3 w-1 ${
                percentage >= marker ? "bg-white" : "bg-gray-400"
              } opacity-70 rounded-full`}
              style={{
                marginLeft: `${marker}%`,
                transform: "translateX(-50%)",
                transition: "background-color 0.5s ease",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Milestone indicators below progress bar */}
      <div className="flex justify-between mt-1 text-xs font-medium">
        <span className="text-red-500">Start</span>
        <span className="text-yellow-500">Quarter</span>
        <span className="text-green-500">Half</span>
        <span className="text-blue-500">Almost</span>
        <span className="text-purple-500">Goal</span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-20deg);
          }
          100% {
            transform: translateX(1000%) skewX(-20deg);
          }
        }
        @keyframes wave {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes moveDot {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(1000%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Demo component with multiple progress bars
const ProgressSection = () => {
  return (
    <div className="w-full rounded-xl shadow-xs p-6 transition-all mb-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-indigo-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-800">✨ Your Progress</h2>
      </div>

      <AnimatedProgressBar
        value={65}
        maxValue={100}
        label="Overall Completion"
      />
    </div>
  );
};

export default ProgressSection;
