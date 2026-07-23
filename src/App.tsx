import {  Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./protected/ProtectedRoutes";
import ChangePassword from "./pages/change-password/Change-password";

export default function App() {
  return (
    <>
        <ProtectedRoutes>
          <Routes>
          <Route path="/" element={<Home />} />
                    <Route path="/change-password" element={<ChangePassword />} />

          </Routes>
        </ProtectedRoutes>
      <Routes>
        {/* Home Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}