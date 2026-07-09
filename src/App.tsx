import {  Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./protected/ProtectedRoutes";

export default function App() {
  return (
    <>
        <ProtectedRoutes>
          <Routes>

          <Route path="/" element={<Home />} />
          </Routes>
        </ProtectedRoutes>
      <Routes>
        {/* Home Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}