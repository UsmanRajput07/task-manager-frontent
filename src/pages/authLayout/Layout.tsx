import type { User } from "@/Types/user";
import { FloatingPaths } from "@/uiComponents/FloatingPaths";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
  const navigate = useNavigate();
  const user = useSelector(
    (state: { auth: { auth: { data: { user: User } } } }) =>
      state.auth?.auth?.data?.user
  );
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/dashboard", { replace: true });
    }
    if (user?.role === "member") {
      navigate("/memberDashboard", { replace: true });
    }
  }, [user]);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-2 md:p-2 py-8">
        <Toaster />
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div> */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-96 md:w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden h-full flex-col items-center justify-center border border-r-gray-500 bg-primary p-10 lg:flex dark:bg-black/10">
        <div>
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
    </div>
  );
}
