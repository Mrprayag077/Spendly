import React from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dailyBudgetData = [
  { date: "2025-04-01", budget: 133.33, actual: 150 },
  { date: "2025-04-02", budget: 133.33, actual: 80 },
  { date: "2025-04-03", budget: 133.33, actual: 90 },
  { date: "2025-04-04", budget: 133.33, actual: 200 },
  { date: "2025-04-05", budget: 133.33, actual: 110 },
  { date: "2025-04-06", budget: 133.33, actual: 60 },
  { date: "2025-04-07", budget: 133.33, actual: 120 },
  { date: "2025-04-08", budget: 133.33, actual: 130 },
  { date: "2025-04-09", budget: 133.33, actual: 145 },
  { date: "2025-04-10", budget: 133.33, actual: 80 },
  { date: "2025-04-11", budget: 133.33, actual: 70 },
  { date: "2025-04-12", budget: 133.33, actual: 190 },
  { date: "2025-04-13", budget: 133.33, actual: 50 },
  { date: "2025-04-14", budget: 133.33, actual: 120 },
];

const Charts = ({ pieChartData }: { pieChartData: any }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Expense Breakdown
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Daily Budget vs. Actual
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyBudgetData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<BudgetTooltip />} />
                <Area
                  type="monotone"
                  dataKey="budget"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorBudget)"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorActual)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6B6B",
  "#6B8E23",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-medium">{`${payload[0].name}: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BudgetTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-medium">{`Date: ${label}`}</p>
        <p className="text-blue-500">{`Budget: $${payload[0].value.toFixed(
          2
        )}`}</p>
        <p className="text-green-500">{`Actual: $${payload[1].value.toFixed(
          2
        )}`}</p>
      </div>
    );
  }
  return null;
};
