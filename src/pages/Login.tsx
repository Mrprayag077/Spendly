import AboutMe from "@/components/common/AboutMe";
import { auth } from "@/lib/firebase";
import { login } from "@/store/authSlice/authSlice";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Eye, EyeOff, Loader, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("test_user@prayag.com");
  const [password, setPassword] = useState("123456789");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedInUser = userCredential.user;
      dispatch(
        login({
          uuid: loggedInUser.uid,
          name: loggedInUser.displayName,
          email: loggedInUser.email ?? "",
        })
      );
      toast.success("logged in successfully!!");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
          <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-purple-200 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-indigo-200 opacity-40 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md bg-white p-6 sm:p-8 shadow-xl rounded-xl border border-gray-100 transform transition-all duration-300 relative z-10 backdrop-blur-sm bg-white/95">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Log In to Spendly
            </h2>
            <p className="text-gray-500 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-5">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 pl-10 pr-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </div>

      <AboutMe />
    </>
  );
};

export default LoginPage;
