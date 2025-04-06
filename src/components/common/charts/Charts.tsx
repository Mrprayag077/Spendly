import useBreakpoint from "@/hooks/breakpoint";
import { ChartArea } from "lucide-react";
import { useChartData } from "@/store/selectors/useChartData";
import { CombinedChart, PieChartView } from "./MainCharts";

const Charts = () => {
  const { pieChartExpenseData, pieChartIncomeData, dailyBudgetData } =
    useChartData();

  const currentPieData = pieChartExpenseData && pieChartIncomeData;
  const showPie = currentPieData.length > 0;
  const showArea = dailyBudgetData.length > 0;

  if (!showPie && !showArea) {
    return <NoDataFallback label="No data available to display charts." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
      <PieChartView />
      <CombinedChart />
    </div>
  );
};

export default Charts;

export const NoDataFallback = ({ label }: { label: string }) => {
  const isMobile = useBreakpoint("md");
  return (
    <div className="flex flex-col items-center mt-2 justify-center h-64 text-gray-500 bg-gray-50 rounded-xl shadow-inner animate-fadeIn">
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
