import { BrowserRouter, Route, Routes } from "react-router";
import AuthRoot from "@/pages/authLayout/Layout";
import SignupForm from "./pages/authLayout/SignupForm";
import { LoginForm } from "./pages/authLayout/LoginForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoot />}>
          <Route index element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
