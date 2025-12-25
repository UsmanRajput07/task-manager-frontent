// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { User } from "@/Types/user";

type Role = "admin" | "member";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const user = useSelector(
    (state: { auth: { auth: { data: { user: User } } } }) =>
      state?.auth?.auth?.data?.user
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
