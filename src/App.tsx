import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
