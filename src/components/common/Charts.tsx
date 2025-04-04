import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BudgetTooltip,
  COLORS,
  CustomLegend,
  CustomTooltip,
  dailyBudgetData,
} from "./ChartExtras";
import useBreakpoint from "@/hooks/breakpoint";
import { ChartArea } from "lucide-react";
import { useChartData } from "@/store/selectors/useChartData";
import { useState } from "react";


const Charts = () => {
  const { pieChartExpenseData, pieChartIncomeData, dailyBudgetData } =
    useChartData();
  const isMobile = useBreakpoint("md");
  const [showExpense, setShowExpense] = useState(true);

  const currentPieData = showExpense ? pieChartExpenseData : pieChartIncomeData;
  const showPie = currentPieData.length > 0;
  const showArea = dailyBudgetData.length > 0;

  if (!showPie && !showArea) {
    return <NoDataFallback label="No data available to display charts." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm transition-all">
        <div className="flex gap-2 justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {showExpense ? "Expense Breakdown" : "Income Breakdown"}
          </h2>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <span className={showExpense ? "text-gray-900" : ""}>Expense</span>
            <button
              onClick={() => setShowExpense((prev) => !prev)}
              className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
                showExpense ? "bg-red-400" : "bg-green-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  showExpense ? "translate-x-0" : "translate-x-6"
                }`}
              />
            </button>
            <span className={!showExpense ? "text-gray-900" : ""}>Income</span>
          </div>
        </div>

        {showPie ? (
          <div
            className={` flex gap-0 items-center ${
              !isMobile ? "flex-col gap-2" : "h-64"
            }`}
          >
            <ResponsiveContainer
              width={isMobile ? "70%" : "100%"}
              height="100%"
            >
              <PieChart>
                <Pie
                  data={currentPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={800}
                >
                  {currentPieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <CustomLegend pieChartData={currentPieData} />
          </div>
        ) : (
          <NoDataFallback label="No data available for pie chart. Add transition" />
        )}
      </div>

      {/* Area Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Daily Budget vs. Actual
        </h2>

        {showArea ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyBudgetData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(date: string) =>
                    new Date(date).getDate().toString()
                  }
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />

                <Tooltip content={<BudgetTooltip />} />

                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBudget)"
                  animationDuration={600}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <NoDataFallback label="No data available for pie chart. Add transition" />
        )}
      </div>
    </div>
  );
};

export default Charts;

const NoDataFallback = ({ label }: { label: string }) => {
  const isMobile = useBreakpoint("md");
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-xl shadow-inner animate-fadeIn">
      <div className="p-4 bg-white rounded-full shadow-sm mb-3">
        <ChartArea
          size={isMobile ? 40 : 32}
          className="text-purple-400 animate-pulse"
        />
      </div>
      <p className="text-base font-medium text-center px-4">{label}</p>
    </div>
  );
};
