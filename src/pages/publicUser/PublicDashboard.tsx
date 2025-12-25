import task from "@/sevices/task";
import TaskTable from "@/uiComponents/TaskTable";
import { UserTaskColumn } from "@/uiComponents/UserTaskColumn";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function PublicDashboard() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { data } = useQuery({
    queryKey: ["get-user-tasks"],
    queryFn: task.getUserTasks,
  });

  const columns = UserTaskColumn({
    onEdit: (taskId) => {
      setTaskId(taskId);
      setOpenEdit(true);
    },
  });
  return (
    <div className="py-2 px-4 flex flex-col gap-4">
      <TaskTable
        data={data ?? []}
        columns={columns}
        downloadCSV={() => {
          toast.error(`not implemented yet`);
        }}
      />
    </div>
  );
}
