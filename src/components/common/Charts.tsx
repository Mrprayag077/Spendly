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
  TooltipProps,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface BudgetData {
  date: string;
  budget: number;
  actual: number;
}

interface ChartsProps {
  pieChartData: ChartData[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6B6B",
  "#6B8E23",
];

const Charts = ({ pieChartData }: ChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm transition-all hover:shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
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
                innerRadius={45}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                animationBegin={200}
                animationDuration={800}
              >
                {pieChartData.map((entry, index) => (
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

// Tooltip Components with TypeScript
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-700">{payload[0].name}</p>
        <p className="text-blue-600">${payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const BudgetTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-700 mb-1">{label}</p>
        <div className="space-y-1">
          <p className="text-indigo-600">
            Budget: ${payload[0].value?.toFixed(2)}
          </p>
          <p className="text-emerald-600">
            Actual: ${payload[1].value?.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Sample data with type
const dailyBudgetData: BudgetData[] = [
  { date: "Mon", budget: 4000, actual: 2400 },
  { date: "Tue", budget: 3000, actual: 1398 },
  { date: "Wed", budget: 2000, actual: 9800 },
  { date: "Thu", budget: 2780, actual: 3908 },
  { date: "Fri", budget: 1890, actual: 4800 },
  { date: "Sat", budget: 2390, actual: 3800 },
  { date: "Sun", budget: 3490, actual: 4300 },
];

export default Charts;
