import { BrowserRouter, Route, Routes } from "react-router";
import AuthRoot from "@/pages/authLayout/Layout";
import SignupForm from "./pages/authLayout/SignupForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import UserDashboard from "./pages/users/UserDashboard";
import MemberDashboard from "./pages/members/MemberDashboard";
import TaskDashboard from "./pages/task/TaskDashboard";
import LoginLayout from "./pages/authLayout/LoginLayout";
import ProtectedRoute from "./pages/authLayout/ProtectedRoute";
import PublicDashboard from "./pages/publicUser/PublicDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoot />}>
          <Route index element={<SignupForm />} />
          <Route path="login" element={<LoginLayout />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserDashboard />} />
            <Route path="members" element={<MemberDashboard />} />
            <Route path="tasks" element={<TaskDashboard />} />
          </Route>
        </Route>
        <Route path="/memberDashboard" element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route index element={<PublicDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
