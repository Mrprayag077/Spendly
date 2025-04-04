import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilePenLine } from "lucide-react";
import { selectSummary, setBudget } from "@/store/summary/summarySlice";

export const AddBudgetModal = () => {
  const dispatch = useDispatch();
  const { budget } = useSelector(selectSummary);

  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleSubmit = () => {
    if (!newBudget || isNaN(parseFloat(newBudget))) return;
    dispatch(setBudget(parseFloat(newBudget)));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md shadow-sm transition-colors">
          <FilePenLine className=" h-5 w-5" />
          <span>Set Budget</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-gradient-to-br from-amber-50 to-white border border-amber-200 shadow-xl">
        <DialogHeader className="border-b border-amber-100 pb-2">
          <DialogTitle className="text-amber-700 font-semibold">
            Update Monthly Budget
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label className="text-sm text-gray-600 mb-1 block">
            Monthly Budget (₹)
          </label>
          <Input
            type="number"
            placeholder="Enter budget amount"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="border-amber-300 focus:ring-amber-200 focus:border-amber-500"
          />
        </div>
        <DialogFooter className="border-t border-amber-100 pt-2">
          <Button
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white w-full"
          >
            Save Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
