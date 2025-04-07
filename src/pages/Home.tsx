import Header from "@/components/common/Header";
import Transactions from "@/components/common/Transactions";
import Charts from "@/components/common/charts/Charts";
import SummaryCard from "@/components/common/SummaryCard";
import { ProfileIcon } from "@/components/common/Profile";
import ProgressSection from "@/components/common/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectUser,
  setSettings,
  showSuggestions,
} from "@/store/authSlice/authSlice";
import FinancialWarnings from "@/components/common/FinancialWarnings";
import { ListCollapse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  addTransaction,
  removeAllTransaction,
  selectSummary,
  setBudget,
  Transaction,
} from "@/store/transactionSlice/transactionSlice";
import LoadingScreen from "@/components/common/Spinner";
import AboutMe from "@/components/common/AboutMe";
import { dummyTransactions } from "@/assets/data/dummyData";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const user = useSelector(selectUser);
  const summary = useSelector(selectSummary);
  const showSuggestion = useSelector(showSuggestions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      // if (user.uuid && user.email) {
      setLoading(true);
      dispatch(removeAllTransaction());
      // debouncedInit(user, dispatch);

      // STATIC FRONTEND
      Object.entries(dummyTransactions as Record<string, Transaction>).forEach(
        ([id, transaction]) => {
          dispatch(addTransaction({ id, transaction }));
        }
      );
      dispatch(setBudget(5000));

      dispatch(
        login({
          uuid: "0077047242ihi894",
          name: "Prayag Bhosale",
          email: "prayagbhosale@gmail.com",
        })
      );
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, user.uuid, user.email]);

  if (loading) return <LoadingScreen />;
  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />

        <main className="pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="bg-red-100 border my-2 border-red-400 text-red-700 text-sm px-3 py-2 rounded relative"
              role="alert"
            >
              <strong className="font-bold">📢 Note:</strong>
              <span className="block sm:inline">
                The backend is hosted on the Render platform. Due to its lower
                latency, this app currently uses static data on Vercel for a
                smoother experience.
              </span>
              <a
                href="https://github.com/Mrprayag077/Spendly_Backend"
                target="_blank"
                className="underline font-semibold ml-1"
              >
                View Backend Repository
              </a>
            </div>

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

      <AboutMe />
    </>
  );
};

export default Home;
