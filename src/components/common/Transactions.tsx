import { userTransactions } from "@/store/transactionSlice/transactionSlice";
import { Plus, Receipt } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { AddTransactionModal } from "../Home/AddTransactionModal";

const Transactions = () => {
  const transactions = useSelector(userTransactions);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={12} className="">
                  <div className="flex flex-col items-center   justify-center py-2 px-4 w-full">
                    <div className="bg-gray-50 rounded-full p-4 mb-3">
                      <Receipt className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-medium mb-1">
                      No transactions yet
                    </p>
                    <p className="text-gray-500 text-sm text-center w-full my-2 mb-4">
                      Start adding income and expenses to track your financial
                      activity.
                    </p>
                    <AddTransactionModal />
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction: any) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
