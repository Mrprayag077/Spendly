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
import { useDispatch } from "react-redux";
import { PlusCircle } from "lucide-react";
import { addTransaction, categoryType } from "@/store/transactionSlice/transactionSlice";

export const AddTransactionModal = () => {
  const dispatch = useDispatch();

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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
          <PlusCircle className="h-5 w-5" />
          <span className="hidden sm:inline">New Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 shadow-lg">
        <DialogHeader className="border-b border-indigo-100 pb-2">
          <DialogTitle className="text-indigo-700 font-medium">
            Add New Transaction
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <select
            className="border border-indigo-200 p-2 rounded-md bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
            value={type}
            onChange={(e) => setType(e.target.value as categoryType)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
          <Input
            placeholder="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          />
        </div>
        <DialogFooter className="border-t border-indigo-100 pt-2">
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
