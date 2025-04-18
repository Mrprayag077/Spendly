import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  categoryType,
  editTransaction,
  selectTransactions,
} from "@/store/transactionSlice/transactionSlice";
import { toast } from "sonner";
const defaultCategories = ["Groceries", "Rent", "Fuel", "Salary", "Shopping"];

export const AddTransactionModal = ({
  initialData,
  isEdit = false,
  open,
  onClose,
}: {
  initialData?: {
    id: string;
    type: categoryType;
    category: string;
    amount: number;
    date: string;
  };
  isEdit?: boolean;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const transaction = useSelector(selectTransactions);
  // const user = useSelector(selectUser);
  const transactionList = Object.values(transaction);

  const [type, setType] = useState<categoryType>(
    initialData?.type || "expense"
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [date, setDate] = useState(initialData?.date || "");

  const quickCategories =
    transactionList.length > 0
      ? [...new Set(transactionList.map((item) => item.category))].slice(0, 5)
      : defaultCategories.slice(0, 3);

  const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

  const handleSubmit = () => {
    if (!category || !amount || !date) return;

    const transactionId = isEdit ? initialData?.id! : generateUniqueId();

    const payload = {
      id: transactionId,
      transaction: {
        type,
        category,
        amount: parseFloat(amount),
        date,
        id: transactionId,
      },
    };

    if (isEdit) {
      dispatch(editTransaction(payload));
      // transactionApi({
      //   userUUID: user.uuid,
      //   action: "edit_transaction",
      //   transactionId,
      //   transactionData: payload.transaction,
      // });
      toast.success("Transaction Updated successfully!!");
    } else {
      dispatch(addTransaction(payload));
      // transactionApi({
      //   userUUID: user.uuid,
      //   action: "add_transaction",
      //   transactionId,
      //   transactionData: payload.transaction,
      // });
      toast.success("Transaction Added successfully!!");
    }

    // Reset & Close
    setType("expense");
    setCategory("");
    setAmount("");
    setDate("");
    onClose();
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  };

  const handleYesterdayClick = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formatted = yesterday.toISOString().split("T")[0];
    setDate(formatted);
  };

  const handleThisWeekClick = () => {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const formatted = firstDayOfWeek.toISOString().split("T")[0];
    setDate(formatted);
  };

  const handleThisMonthClick = () => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const formatted = firstDayOfMonth.toISOString().split("T")[0];
    setDate(formatted);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 shadow-lg">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-xl font-semibold text-indigo-700">
            {isEdit ? "Edit Transaction" : "Add New Transaction"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as categoryType)}
            className="w-full border border-indigo-200 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          {/* Category + Quick Select */}
          <div className="space-y-2">
            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {quickCategories.map((cat) => (
                <button
                  key={cat}
                  className="text-xs px-3 py-1 border border-indigo-300 text-indigo-700 rounded-full bg-white shadow-sm hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-200 ease-in-out"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />

          {/* Date + Today Shortcut */}
          <div className="space-y-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleTodayClick}
                className="text-indigo-600 px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-md transition"
              >
                📅 Today
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleYesterdayClick}
                className="text-indigo-600 px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-md transition"
              >
                📆 Yesterday
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleThisWeekClick}
                className="text-indigo-600 px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-md transition"
              >
                🗓️ This Week
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleThisMonthClick}
                className="text-indigo-600 px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-md transition"
              >
                🗓️ This Month
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 border-t border-indigo-100 pt-4">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
          >
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
