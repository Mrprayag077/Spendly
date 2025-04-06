import { login } from "@/store/authSlice/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../common/Spinner";

interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
}

export default function ProtectedRoute({ Component }: ProtectedRouteProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uuid: user.uid,
            name: user.displayName ?? "user test",
            email: user.email ?? "",
          })
        );

        // ✅ Optional: Save to localStorage if you really need it
        localStorage.setItem(
          "user",
          JSON.stringify({
            uuid: user.uid,
            name: user.displayName ?? "user test",
            email: user.email ?? "",
          })
        );

        setIsAuthenticated(true);
      } else {
        // Clean up if logged out
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
}
