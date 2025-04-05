import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Filter, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { categoryType } from "@/store/transactionSlice/transactionSlice";
import { useEffect, useState } from "react";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeFilters: any[];
  dateRange: { from: string; to: string };
  setDateRange: Function;
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectedTypes: categoryType[];
  toggleType: (type: categoryType) => void;
  amountRange: { min: number; max: number };
  setAmountRange: (range: { min: number; max: number }) => void;
  maxPossibleAmount: number;
  resetFilters: () => void;
}

const FilterModal = ({
  open,
  onOpenChange,
  activeFilters,
  dateRange,
  setDateRange,
  categories,
  selectedCategories,
  toggleCategory,
  selectedTypes,
  toggleType,
  amountRange,
  setAmountRange,
  maxPossibleAmount,
  resetFilters,
}: FilterModalProps) => {
  const [viewportHeight, setViewportHeight] = useState("80vh");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportHeight("70vh");
      } else {
        setViewportHeight("80vh");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] p-0 overflow-hidden rounded-xl border border-indigo-100 shadow-xl bg-gradient-to-br from-white via-indigo-50 to-white">
        <DialogHeader className="px-4 sm:px-6 sm:pt-6 lg:pt-1 pb-2">
          <DialogTitle className="text-indigo-800 text-lg">Filters</DialogTitle>
        </DialogHeader>

        <div
          className="divide-y divide-indigo-100 overflow-y-auto"
          style={{ maxHeight: viewportHeight }}
        >
          <section className="p-3 sm:p-4">
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-gray-700">Date Range</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">From</label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange((prev: any) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                  className="text-sm border-indigo-200 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">To</label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange((prev: any) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                  className="text-sm border-indigo-200 focus:ring-indigo-300"
                />
              </div>
            </div>
          </section>

          <section className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Tag className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-gray-700">Categories</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="truncate">{category}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <DollarSign className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-gray-700">Transaction Type</h4>
            </div>
            <div className="flex gap-4">
              {["income", "expense"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type as categoryType)}
                    onChange={() => toggleType(type as categoryType)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </section>

          <section className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <DollarSign className="h-4 w-4 text-indigo-500" />
              <h4 className="font-medium text-gray-700">Amount Range</h4>
            </div>
            <Slider
              min={0}
              max={maxPossibleAmount}
              step={10}
              value={[amountRange.min, amountRange.max]}
              onValueChange={([min, max]) => setAmountRange({ min, max })}
              className="
    mb-4
    bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full
    [&_[role='slider']]:bg-white
    [&_[role='slider']]:border-2 [&_[role='slider']]:border-indigo-500
    [&_[role='slider']]:shadow-lg
    [&_[role='slider']]:w-4 [&_[role='slider']]:h-4
    [&_[role='slider']]:hover:bg-indigo-100
    [&_[data-state='active']]:bg-indigo-200
    [&_[data-state='active']]:border-indigo-700
    [&_[role='slider']]:rounded-full
    [&_[role='presentation']]:h-2 [&_[role='presentation']]:rounded-full
  "
            />

            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{amountRange.min}</span>
              <span>₹{amountRange.max}</span>
            </div>
          </section>
        </div>

        <div className="p-3 sm:p-4 flex justify-between border-t border-indigo-100">
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="text-gray-600 cursor-pointer hover:text-gray-900"
          >
            Reset All
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            Apply Filters
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
