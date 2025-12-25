import { Button } from "@/components/ui/button";
import user from "@/sevices/user";
import { UserColumn } from "@/uiComponents/UserColumn";
import UserTable from "@/uiComponents/UserTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UserDailog from "./UserDailog";
import { useState } from "react";
import type { getUser } from "@/Types/user";
import { AlertDialogComp } from "@/uiComponents/AlertDailogComp";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<getUser | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: user.getuser,
  });

  const columns = UserColumn({
    onEdit: (user) => {
      setSelectedUser(user);
      setOpen(true);
    },
    onDelete: (id) => {
      setDeleteId(id);
      setOpenDelete(true);
    },
  });

  const handleClean = () => {
    setSelectedUser(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteUser.mutate(deleteId);
    }
  };

  const deleteUser = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: user.deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpenDelete(false);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  return (
    <div className="py-4 px-4 flex flex-col gap-4">
      <UserDailog
        open={open}
        setOpen={setOpen}
        btnTitle={selectedUser ? "Update" : "Create"}
        title={selectedUser?.name ? "Update User" : "Create User"}
        desc={
          selectedUser?.name ? "Update User Details" : "Create User new user"
        }
        data={selectedUser}
        cleanUp={handleClean}
      />
      <AlertDialogComp
        open={openDelete}
        setOpen={setOpenDelete}
        title="Are you sure you want to delete this user?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        fn={handleDelete}
      />
      <div className="flex flex-row items-center justify-end">
        <Button onClick={() => setOpen(true)}>Add User</Button>
      </div>
      <UserTable
        downloadCSV={() => {
          toast.error("not implemented yet");
        }}
        columns={columns}
        data={data?.data ?? []}
      />
    </div>
  );
}
