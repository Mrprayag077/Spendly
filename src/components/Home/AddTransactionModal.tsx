import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";
import {
  addTransaction,
  categoryType,
  userTransactions,
} from "@/store/transactionSlice/transactionSlice";
import { toast } from "sonner";
const defaultCategories = ["Groceries", "Rent", "Fuel", "Salary", "Shopping"];

export const AddTransactionModal = () => {
  const dispatch = useDispatch();
  const transaction = useSelector(userTransactions);

  const quickCategories =
    transaction.length > 0
      ? [...new Set(transaction.map((item) => item.category))].slice(0, 3)
      : defaultCategories.slice(0, 3);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<categoryType>("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!category || !amount || !date) return;

    dispatch(
      addTransaction({
        type,
        category,
        amount: parseFloat(amount),
        date,
      })
    );

    setType("expense");
    setCategory("");
    setAmount("");
    setDate("");

    setOpen(false);
    toast.success("Transaction Added successfully!!");
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="action-button bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="h-5 w-5" />
          <span className="hidden sm:inline">New Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 shadow-lg">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-xl font-semibold text-indigo-700">
            Add New Transaction
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
            <div className="flex flex-wrap gap-2">
              {quickCategories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant="outline"
                  className="text-xs border border-indigo-300 text-indigo-700 rounded-full hover:bg-indigo-100 transition"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleTodayClick}
              className="text-indigo-600 px-3 py-1 text-xs bg-indigo-100 hover:bg-indigo-200 rounded-md transition"
            >
              📅 Set Today
            </Button>
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
