import { DollarSign, Menu, PlusCircle } from "lucide-react";
import { AddTransactionModal } from "../Home/AddTransactionModal";
import { useState } from "react";
import { AddBudgetModal } from "../Home/AddBudgetModal";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="mr-4 text-gray-500 lg:hidden focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-indigo-900 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-indigo-600" />
              Spendly
            </h1>
          </div>
          <div className="flex justify-around items-center gap-2">
            <AddTransactionModal />
            <AddBudgetModal />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
