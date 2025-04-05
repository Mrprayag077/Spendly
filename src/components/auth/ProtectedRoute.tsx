import { selectIsAuthenticated } from "@/store/authSlice/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    React.useEffect(() => {
      const auth = getAuth();

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user || !isAuthenticated) {
          navigate("/login");
        }
      });

      return () => unsubscribe();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
