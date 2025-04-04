import { useState, useEffect } from "react";
import {
  categoryType,
  Transaction,
  userTransactions,
} from "@/store/transactionSlice/transactionSlice";
import {
  Receipt,
  Filter,
  Calendar,
  Search,
  XCircle,
  DollarSign,
  Tag,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddTransactionModal } from "../Home/AddTransactionModal";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";
import { format } from "date-fns";
import FilterModal from "./FilterModal";

interface DateRange {
  from: string;
  to: string;
}

interface AmountRange {
  min: number;
  max: number;
}
type FilterItem = {
  type: string;
  label: string;
  value: any;
};

const Transactions = () => {
  const allTransactions: Transaction[] = useSelector(userTransactions);

  const [transactions, setTransactions] =
    useState<Transaction[]>(allTransactions);
  const [activeFilters, setActiveFilters] = useState<FilterItem[]>([]);

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<categoryType[]>([]);
  const [amountRange, setAmountRange] = useState<AmountRange>({
    min: 0,
    max: 10000,
  });

  const categories = [...new Set(allTransactions.map((t) => t.category))];

  const maxPossibleAmount = Math.max(
    ...allTransactions.map((t) => t.amount),
    1000
  );

  useEffect(() => {
    let filtered = allTransactions;
    let appliedFilters: FilterItem[] = [];

    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      appliedFilters.push({
        type: "search",
        label: `"${searchTerm}"`,
        value: searchTerm,
      });
    }

    if (dateRange.from && dateRange.to) {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate >= fromDate && transactionDate <= toDate;
      });
      appliedFilters.push({
        type: "dateRange",
        label: `${format(new Date(dateRange.from), "MMM d")} - ${format(
          new Date(dateRange.to),
          "MMM d"
        )}`,
        value: dateRange,
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((t) =>
        selectedCategories.includes(t.category)
      );
      appliedFilters.push({
        type: "categories",
        label: `${selectedCategories.length} categories`,
        value: selectedCategories,
      });
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((t) => selectedTypes.includes(t.type));
      appliedFilters.push({
        type: "types",
        label: selectedTypes.join(", "),
        value: selectedTypes,
      });
    }

    if (amountRange.min > 0 || amountRange.max < maxPossibleAmount) {
      filtered = filtered.filter((t) => {
        const amount = t.amount;
        return amount >= amountRange.min && amount <= amountRange.max;
      });
      appliedFilters.push({
        type: "amountRange",
        label: `$${amountRange.min} - $${amountRange.max}`,
        value: amountRange,
      });
    }

    setTransactions(filtered);
    setActiveFilters(appliedFilters);
  }, [
    searchTerm,
    dateRange,
    selectedCategories,
    selectedTypes,
    amountRange,
    allTransactions,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setDateRange({ from: "", to: "" });
    setSelectedCategories([]);
    setSelectedTypes([]);
    setAmountRange({ min: 0, max: maxPossibleAmount });
    setActiveFilters([]);
  };

  const removeFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        setSearchTerm("");
        break;
      case "dateRange":
        setDateRange({ from: "", to: "" });
        break;
      case "categories":
        setSelectedCategories([]);
        break;
      case "types":
        setSelectedTypes([]);
        break;
      case "amountRange":
        setAmountRange({ min: 0, max: maxPossibleAmount });
        break;
      default:
        break;
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleType = (type: categoryType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>

        {}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-gray-200 w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <XCircle className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <Button
            onClick={() => setFilterOpen(true)}
            variant="outline"
            className={`flex items-center gap-2 shadow-sm ${
              activeFilters.length > 0
                ? "border-indigo-400 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="bg-indigo-100 text-indigo-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow-inner">
                {activeFilters.length}
              </span>
            )}
          </Button>

          <FilterModal
            open={filterOpen}
            onOpenChange={setFilterOpen}
            activeFilters={activeFilters}
            dateRange={dateRange}
            setDateRange={setDateRange}
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedTypes={selectedTypes}
            toggleType={toggleType}
            amountRange={amountRange}
            setAmountRange={setAmountRange}
            maxPossibleAmount={maxPossibleAmount}
            resetFilters={resetFilters}
          />

          <AddTransactionModal />
        </div>
      </div>

      {}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => removeFilter(filter.type)}
                className="hover:text-indigo-900"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}

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
                  <div className="flex flex-col items-center justify-center py-10 px-4 w-full">
                    <div className="bg-gray-50 rounded-full p-4 mb-3">
                      <Receipt className="h-8 w-8 text-gray-400" />
                    </div>
                    {activeFilters.length > 0 ? (
                      <>
                        <p className="text-gray-700 font-medium mb-1">
                          No matching transactions
                        </p>
                        <p className="text-gray-500 text-sm text-center w-full my-2 mb-4">
                          Try adjusting your filters to see more results.
                        </p>
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          className="mt-2"
                        >
                          Clear Filters
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 font-medium mb-1">
                          No transactions yet
                        </p>
                        <p className="text-gray-500 text-sm text-center w-full my-2 mb-4">
                          Start adding income and expenses to track your
                          financial activity.
                        </p>
                        <AddTransactionModal />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.date}>
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
