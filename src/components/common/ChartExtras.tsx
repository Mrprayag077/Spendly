import { TooltipProps } from "recharts";

export const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
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
interface PieChartData {
  name: string;
  value: number;
}

export const CustomLegend: React.FC<{ pieChartData: PieChartData[] }> = ({
  pieChartData,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {pieChartData.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {entry.name}
          </span>
        </div>
      ))}
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
