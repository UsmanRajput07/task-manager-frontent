import { BrowserRouter, Route, Routes } from "react-router";
import AuthRoot from "@/pages/authLayout/Layout";
import SignupForm from "./pages/authLayout/SignupForm";
import { LoginForm } from "./pages/authLayout/LoginForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import UserDashboard from "./pages/users/UserDashboard";
import MemberDashboard from "./pages/members/MemberDashboard";
import TaskDashboard from "./pages/task/TaskDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoot />}>
          <Route index element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserDashboard />} />
          <Route path="members" element={<MemberDashboard />} />
          <Route path="tasks" element={<TaskDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
