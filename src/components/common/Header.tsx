import { DollarSign, LogOut, Menu } from "lucide-react";
import { AddBudgetModal } from "../Home/AddBudgetModal";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

          <Button
            className="action-button bg-purple-500 hover:bg-purple-600"
            onClick={logoutUser}
          >
            <LogOut className=" h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
