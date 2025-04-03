import { TooltipProps } from "recharts";

interface PieChartData {
  name: string;
  value: number;
}

export const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-100 backdrop-blur-sm">
        <p className="font-medium text-gray-700 text-sm mb-1">
          {payload[0].name}
        </p>
        <p className="text-blue-600 font-semibold">
          $
          {payload[0].value?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export const CustomLegend: React.FC<{ pieChartData: PieChartData[] }> = ({
  pieChartData,
}) => {
  const total = pieChartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[160px]">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
      <div className="overflow-y-scroll h-full mb-4 pb-4 scrollbar-thin">
        {pieChartData.map((entry, index) => {
          const percentage = ((entry.value / total) * 100).toFixed(1);

          return (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full shadow-sm transition-transform group-hover:scale-125"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {entry.name}
                  </span>
                  <span className="text-xs font-medium text-gray-500 ml-2">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BudgetTooltip = ({
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

interface BudgetData {
  date: string;
  budget: number;
  actual: number;
}

export const dailyBudgetData: BudgetData[] = [
  { date: "Mon", budget: 4000, actual: 2400 },
  { date: "Tue", budget: 3000, actual: 1398 },
  { date: "Wed", budget: 2000, actual: 9800 },
  { date: "Thu", budget: 2780, actual: 3908 },
  { date: "Fri", budget: 1890, actual: 4800 },
  { date: "Sat", budget: 2390, actual: 3800 },
  { date: "Sun", budget: 3490, actual: 4300 },
];

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6B6B",
  "#6B8E23",
];
