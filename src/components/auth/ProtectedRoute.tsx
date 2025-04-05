import { login } from "@/store/authSlice/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {

        console.log("user", user);
        if (user) {
        console.log("user if");

          dispatch(
            login({
              uuid: user.uid,
              name: user.displayName ?? "fistname lastname",
              email: user.email ?? "",
            })
          );
        } else {
                  console.log("user else");

          navigate("/login");
        }
      });

      return () => unsubscribe();
    }, [dispatch, navigate]);

    return <Component {...props} />;
  };
}
