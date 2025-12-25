import UserTable from "@/uiComponents/UserTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AlertDialogComp } from "@/uiComponents/AlertDailogComp";
import { MemberColumn } from "@/uiComponents/MemberColumn";
import projectS from "@/sevices/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/Types/project";
import member from "@/sevices/member";

export default function MemberDashboard() {
  // const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  // const [selectedUser, setSelectedUser] = useState<getUser | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: projectS.getProjects,
  });

  const members = useQuery({
    queryKey: ["members", selectedProject],
    queryFn: () => member.fetchMembers(selectedProject),
    enabled: !!selectedProject,
  });

  const columns = MemberColumn({
    onDelete: (id) => {
      setDeleteId(id);
      setOpenDelete(true);
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteMember.mutate(deleteId);
    }
  };

  const deleteMember = useMutation({
    mutationKey: ["delete-project-member"],
    mutationFn: member.deleteMember,
    onSuccess: () => {
      toast.success("user project access revoked successfully");
      queryClient.invalidateQueries({
        queryKey: ["members", selectedProject],
      });
      setOpenDelete(false);
    },
    onError: () => {
      toast.error("Failed to revoke user project access");
    },
  });

  useEffect(() => {
    setSelectedProject(data?.data?.[0]?.id || "");
  }, [data?.data]);

  return (
    <div className="py-4 px-4 flex flex-col gap-4">
      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {data?.data?.map((project: Project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AlertDialogComp
        open={openDelete}
        setOpen={setOpenDelete}
        title="Are you sure you want to revoke project access?"
        description="This action cannot be undone. This will revoke the user's access to the project."
        fn={handleDelete}
      />
      <UserTable
        downloadCSV={() => {
          toast.error("not implemented yet");
        }}
        columns={columns}
        data={members.data?.data || []}
        isLoading={members.isLoading}
      />
    </div>
  );
}
