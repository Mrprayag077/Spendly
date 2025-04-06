import { PlusCircle, MinusCircle, Wallet, DollarSign } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const Summary: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  textColor,
}) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm ${bgColor}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${textColor}`}>${value}</p>
        </div>
        <div className="p-3 rounded-full bg-white shadow-sm">{icon}</div>
      </div>
    </div>
  );
};

interface SummaryProps {
  summary: any;
}

function SummaryCard({ summary }: SummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Summary
        title="Total Income"
        value={summary.totalIncome}
        icon={<PlusCircle className="text-green-600" />}
        bgColor="bg-green-50"
        textColor="text-green-800"
      />
      <Summary
        title="Total Expenses"
        value={summary.totalExpenses}
        icon={<MinusCircle className="text-red-600" />}
        bgColor="bg-red-50"
        textColor="text-red-800"
      />
      <Summary
        title="Balance"
        value={summary.balance}
        icon={<Wallet className="text-blue-600" />}
        bgColor="bg-blue-50"
        textColor="text-blue-800"
      />
      <Summary
        title="Monthly Budget"
        value={summary.budget}
        icon={<DollarSign className="text-purple-600" />}
        bgColor="bg-purple-50"
        textColor="text-purple-800"
      />
    </div>
  );
}

export default SummaryCard;
