import * as React from "react";
import { IconBookFilled, IconInnerShadowTop } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { Link } from "react-router";
import { User, UsersRound, ClipboardList } from "lucide-react";
import { useSelector } from "react-redux";
import type { User as UserType } from "@/Types/user";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconBookFilled,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: User,
    },
    {
      title: "Members",
      url: "/dashboard/members",
      icon: UsersRound,
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: ClipboardList,
    },
  ],

  userMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconBookFilled,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector(
    (state: { auth: { auth: { data: { user: UserType } } } }) =>
      state.auth?.auth?.data?.user
  );
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Task Manager</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user?.role === "admin" ? (
          <NavMain items={data.navMain} />
        ) : (
          <NavMain items={data.userMain} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
