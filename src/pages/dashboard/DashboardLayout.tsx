import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/uiComponents/AppSidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Toaster } from "sonner";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const authToken = useSelector(
    (state: { auth: { auth: {data: {token: string}} } }) =>
      state.auth?.auth?.data?.token
  );
  useEffect(()=>{
    if(!authToken){
      navigate("/", { replace: true });
    }
  },[authToken])
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Toaster/>
        {/* <SiteHeader /> */}
        <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
