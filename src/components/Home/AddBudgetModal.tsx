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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilePenLine } from "lucide-react";
import { selectUser, setSettings } from "@/store/authSlice/authSlice";
import {
  selectSummary,
  setBudget,
} from "@/store/transactionSlice/transactionSlice";
import { toast } from "sonner";

export const AddBudgetModal = () => {
  const dispatch = useDispatch();
  const { budget } = useSelector(selectSummary);
  const { uuid } = useSelector(selectUser);

  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  const handleSubmit = () => {
    if (!newBudget || isNaN(newBudget) || !uuid) return;

    try {
      dispatch(setBudget(newBudget));

      // updateProfileP({ userUUID: uuid, profileData: { budget: newBudget } });
      toast.success("Budget updated successfully!!");
      dispatch(setSettings(false));
      setOpen(false);
    } catch (err) {
      toast.error("Budget not updated");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="action-button bg-amber-500 hover:bg-amber-600">
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
            onChange={(e) => setNewBudget(Number(e.target.value))}
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
