import TaskSheet from "@/uiComponents/TaskSheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import project from "@/sevices/project";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/Types/project";
import TaskTable from "@/uiComponents/TaskTable";
import task from "@/sevices/task";
import { AlertDialogComp } from "@/uiComponents/AlertDailogComp";
import { TaskColumn } from "@/uiComponents/TaskColumn";

export default function TaskDashboard() {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();
  const columns = TaskColumn({
    onDelete: (taskId) => {
      setDeleteId(taskId);
      setOpenDelete(true);
    },
  });

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: project.getProjects,
  });

  const { data: members } = useQuery({
    queryKey: ["tasks", selectedProject],
    queryFn: () => task.fetchTasks(selectedProject),
    enabled: !!selectedProject,
  });

  const deleteTask = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: task.deleteTask,
    onSuccess: () => {
      toast.success(`task delete successfully`);
      queryClient.invalidateQueries({ queryKey: ["tasks", selectedProject] });
      setOpenDelete(false);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteTask.mutate(deleteId);
    }
  };

  useEffect(() => {
    setSelectedProject(data?.data?.[0]?.id || "");
  }, [data?.data]);

  return (
    <div className="py-2 px-4 flex flex-col gap-4">
      <div className="flex justify-between align-center">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[280px]">
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
        <TaskSheet
          buttonTitle="Craete task"
          title="Create a new task"
          description="craete a task and assign to user"
        />
      </div>

      <TaskTable
        downloadCSV={() => {
          toast.error("not implemented yet");
        }}
        columns={columns}
        data={members?.data ?? []}
        isLoading={members?.isLoading}
      />
    </div>
  );
}
