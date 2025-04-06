import Header from "@/components/common/Header";
import Transactions from "@/components/common/Transactions";
import Charts from "@/components/common/Charts";
import SummaryCard from "@/components/common/SummaryCard";
import { ProfileIcon } from "@/components/common/Profile";
import ProgressSection from "@/components/common/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  login,
  selectUser,
  setSettings,
  showSuggestions,
} from "@/store/authSlice/authSlice";
import { selectSummary } from "@/store/summary/summarySlice";
import FinancialWarnings from "@/components/common/FinancialWarnings";
import { ListCollapse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addTransaction } from "@/store/transactionSlice/transactionSlice";
import { fetchUserData } from "@/services/api";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const user = useSelector(selectUser);
  const summary = useSelector(selectSummary);
  const showSuggestion = useSelector(showSuggestions);

  useEffect(() => {
    const init = async () => {
      try {
        if (user.uuid) {
          const data = await fetchUserData(user.uuid);

          if (data) {
            dispatch(
              login({
                uuid: user.uuid,
                name: data.profile?.name || "User",
                email: data.profile?.email || "",
              })
            );
            console.log(data);
            toast.success("data fetched successfully!!");
          }
        } else {
                console.log("jjjjj11");

        }
      } catch (err) {
        console.log(err);
        toast.error("Error occurred");
      }
    };

    if (user.uuid && user.email) {
      console.log(user.uuid, user.email);
      init();
    } else {
      console.log("jjjjj");
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FinancialWarnings />

          <div className="bg-white rounded-2xl shadow-md p-2 lg:p-6 transition-all duration-500 mb-4">
            <div className="flex justify-between items-center md:mb-2 mb-4">
              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                {userName?.name ? (
                  <ProfileIcon name={userName.name} />
                ) : (
                  <ProfileIcon name="User" />
                )}
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {userName?.name}
                </h1>
              </div>

              {showSuggestion && (
                <Button
                  onClick={() => dispatch(setSettings(false))}
                  className="flex items-center gap-2 text-xs bg-yellow-100/50 border border-amber-400 shadow-sm cursor-pointer text-blue-500 hover:text-blue-800 transition-colors duration-200"
                >
                  <ListCollapse className="text-green-500" />
                  Show suggestions
                </Button>
              )}
            </div>

            <SummaryCard summary={summary} />
            <ProgressSection />
            <Charts />
          </div>

          <Transactions />
        </div>
      </main>
    </div>
  );
};

export default Home;
