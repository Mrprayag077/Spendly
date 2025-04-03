import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";

function Cards({ summary }: { summary: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        {
          label: "Total Income",
          value: summary.totalIncome,
          color: "green",
          Icon: ArrowUpCircle,
        },
        {
          label: "Total Expenses",
          value: summary.totalExpenses,
          color: "red",
          Icon: ArrowDownCircle,
        },
        {
          label: "Balance",
          value: summary.balance,
          color: "blue",
          Icon: DollarSign,
        },
        {
          label: "Monthly Budget",
          value: summary.budget,
          color: "purple",
          Icon: DollarSign,
        },
      ].map(({ label, value, color, Icon }, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-xl shadow-xs p-6 flex items-center gap-4 border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-${color}-500`}
        >
          <div className={`rounded-full bg-${color}-100 p-4 flex-shrink-0`}>
            <Icon className={`h-9 w-9 text-${color}-600`} />
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900">${value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
