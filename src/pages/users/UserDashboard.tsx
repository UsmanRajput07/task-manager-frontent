import { Button } from "@/components/ui/button";
import user from "@/sevices/user";
import { UserColumn } from "@/uiComponents/UserColumn";
import UserTable from "@/uiComponents/UserTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import UserDailog from "./UserDailog";
import { useState } from "react";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: user.getuser,
  });

  return (
    <div className="py-4 px-4 flex flex-col gap-4">
      <UserDailog
        open={open}
        setOpen={setOpen}
        btnTitle="Create"
        title="User Create"
        desc="Create a new user"
      />
      <div className="flex flex-row items-center justify-end">
        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>
      <UserTable
        downloadCSV={() => {
          toast.error("not implemented yet");
        }}
        columns={UserColumn}
        data={data?.data ?? []}
      />
    </div>
  );
}
