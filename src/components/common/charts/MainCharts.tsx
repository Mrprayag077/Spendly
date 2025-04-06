import { useChartData } from "@/store/selectors/useChartData";
import { useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
  ComposedChart,
  Line,
  ReferenceLine,
  Label,
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  BudgetComparisonTooltip,
  COLORS,
  CustomLegend,
  CustomTooltip,
} from "./ChartExtras";
import { NoDataFallback } from "./Charts";
import useBreakpoint from "@/hooks/breakpoint";

function PieChartView() {
  const { pieChartExpenseData, pieChartIncomeData } = useChartData();
  const isMobile = useBreakpoint("md");
  const [showExpense, setShowExpense] = useState(true);

  const currentPieData = showExpense ? pieChartExpenseData : pieChartIncomeData;
  const showPie = currentPieData.length > 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm transition-all">
      <div className="flex gap-2 justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {showExpense ? "Expense Breakdown" : "Income Breakdown"}
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <span className={showExpense ? "text-gray-900" : ""}>Expense</span>
          <button
            onClick={() => setShowExpense((prev) => !prev)}
            className={`w-12 h-6 flex items-center cursor-pointer bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
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
          <ResponsiveContainer width={isMobile ? "70%" : "100%"} height="100%">
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
  );
}

const CombinedChart = () => {
  const { dailyBudgetData } = useChartData();
  const [viewMode, setViewMode] = useState("area");

  const showChart = dailyBudgetData && dailyBudgetData.length > 0;

  // Calculate overall budget performance
  const totalBudget = dailyBudgetData.reduce((sum, day) => sum + day.budget, 0);
  const totalActual = dailyBudgetData.reduce((sum, day) => sum + day.actual, 0);
  const overallDifference = totalBudget - totalActual;
  const percentOfBudget = Math.round((totalActual / totalBudget) * 100);
  const isOverBudget = overallDifference < 0;

  const renderChart = () => {
    if (viewMode === "area") {
      return (
        <AreaChart
          data={dailyBudgetData}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(date) => new Date(date).getDate().toString()}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<BudgetComparisonTooltip />} />
          <Legend />
          <Area
            name="Budget"
            type="monotone"
            dataKey="budget"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBudget)"
            activeDot={{ r: 6 }}
            animationDuration={600}
          />
          <Area
            name="Actual"
            type="monotone"
            dataKey="actual"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorActual)"
            activeDot={{ r: 6 }}
            animationDuration={600}
          />
        </AreaChart>
      );
    }

    if (viewMode === "bar") {
      return (
        <BarChart
          data={dailyBudgetData}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(date) => new Date(date).getDate().toString()}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<BudgetComparisonTooltip />} />
          <Legend />
          <Bar
            name="Budget"
            dataKey="budget"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
          />
          <Bar
            name="Actual"
            dataKey="actual"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
          />
        </BarChart>
      );
    }

    if (viewMode === "combined") {
      return (
        <ComposedChart
          data={dailyBudgetData}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(date) => new Date(date).getDate().toString()}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<BudgetComparisonTooltip />} />
          <Legend />
          <Bar
            name="Actual"
            dataKey="actual"
            barSize={20}
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
          />
          <Line
            name="Budget"
            type="monotone"
            dataKey="budget"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ stroke: "#6366f1", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={600}
          />
          <ReferenceLine
            y={totalBudget / dailyBudgetData.length}
            stroke="#6366f1"
            strokeDasharray="3 3"
          >
            <Label
              value="Avg Budget"
              position="insideTopRight"
              fill="#6366f1"
              fontSize={10}
            />
          </ReferenceLine>
        </ComposedChart>
      );
    }

    return null; // fallback
  };
  const chartElement = renderChart();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Daily Budget vs. Actual
        </h2>

        {showChart && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("area")}
              className={`px-2 py-1 text-xs rounded ${
                viewMode === "area"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setViewMode("bar")}
              className={`px-2 py-1 text-xs rounded ${
                viewMode === "bar"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Bar
            </button>
            <button
              onClick={() => setViewMode("combined")}
              className={`px-2 py-1 text-xs rounded ${
                viewMode === "combined"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Combined
            </button>
          </div>
        )}
      </div>

      {showChart ? (
        <>
          <div className="h-64">
            {chartElement && (
              <ResponsiveContainer width="100%" height="100%">
                {chartElement}
              </ResponsiveContainer>
            )}
          </div>
        </>
      ) : (
        <NoDataFallback label="No budget data available. Add transactions to see your budget comparison." />
      )}
    </div>
  );
};

export { CombinedChart, PieChartView };
