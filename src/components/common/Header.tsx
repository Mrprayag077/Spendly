import { DollarSign, Menu, PlusCircle } from "lucide-react";

function Header() {
  return (
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
        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm">
          <PlusCircle className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">New Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
