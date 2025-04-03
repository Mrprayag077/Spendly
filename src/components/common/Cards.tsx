import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";

function Cards({ summary }: { summary: any }) {
  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4 flex-shrink-0">
            <ArrowUpCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-bold">${summary.totalIncome}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4 flex-shrink-0">
            <ArrowDownCircle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold">${summary.totalExpenses}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4 flex-shrink-0">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-2xl font-bold">${summary.balance}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:scale-105 hover:shadow-md flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4 flex-shrink-0">
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Budget</p>
            <p className="text-2xl font-bold">${summary.budget}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
