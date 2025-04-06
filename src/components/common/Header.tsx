import { Database, DollarSign, LogOut, Menu, RotateCcw } from "lucide-react";
import { AddBudgetModal } from "../Home/AddBudgetModal";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { dummyDatt, dummyTransactions } from "@/assets";
import {
  addTransaction,
  removeAllTransaction,
  selectTransactions,
  setBudget,
} from "@/store/transactionSlice/transactionSlice";
import { handleLogout } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transactions = useSelector(selectTransactions);

  const handleInjectDummyData = async () => {
    dispatch(removeAllTransaction());
    setTimeout(() => {
      Object.entries(dummyDatt.transactions).forEach(([id, transaction]) => {
        dispatch(addTransaction({ id, transaction }));
      });

      dispatch(setBudget(3000));
    }, 0);
  };

  const handleResetData = async () => {
    dispatch(removeAllTransaction());
    dispatch(setBudget(0));
  };

  function logoutUser() {
    try {
      handleLogout();
      dispatch(logout());
    } catch (err) {
      console.log("error", err);
    } finally {
      navigate("/login");
    }
  }

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
        <div className="flex justify-around items-center gap-2">
          <AddBudgetModal />

          {Object.keys(transactions).length === 0 ? (
            <Button
              className="action-button bg-blue-500 hover:bg-blue-600"
              onClick={handleInjectDummyData}
            >
              <Database className=" h-5 w-5" />
              <span>Add Dummy Data</span>
            </Button>
          ) : (
            <Button
              className="action-button bg-red-500 hover:bg-red-600"
              onClick={handleResetData}
            >
              <RotateCcw className=" h-5 w-5" />
              <span>Reset Data</span>
            </Button>
          )}

          <Button
            className="action-button bg-purple-500 hover:bg-purple-600"
            onClick={logoutUser}
          >
            <LogOut className=" h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
