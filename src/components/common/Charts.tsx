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

interface ChartData {
  name: string;
  value: number;
}

interface ChartsProps {
  pieChartData: ChartData[];
}

const Charts = ({ pieChartData }: ChartsProps) => {
  const isMobile = useBreakpoint("md");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm transition-all">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Expense Breakdown
        </h2>
        <div
          className={` flex gap-0 items-center ${
            !isMobile ? "flex-col gap-2" : "h-64"
          }`}
        >
          <ResponsiveContainer width={isMobile ? "70%" : "100%"} height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
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
                {pieChartData.map((_, index) => (
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

          <CustomLegend pieChartData={pieChartData} />
        </div>
      </div>

      {/* Area Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Daily Budget vs. Actual
        </h2>
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
              />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />

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
      </div>
    </div>
  );
};

export default Charts;
