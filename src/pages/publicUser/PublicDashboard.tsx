import task from "@/sevices/task";
import type { TaskData } from "@/Types/task";
import TaskStatus from "@/uiComponents/TaskStatus";
import TaskTable from "@/uiComponents/TaskTable";
import { UserTaskColumn } from "@/uiComponents/UserTaskColumn";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import TaskSummary from "@/uiComponents/TaskSummary";



export default function PublicDashboard() {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { data } = useQuery({
    queryKey: ["get-user-tasks"],
    queryFn: task.getUserTasks,
  });

  const columns = UserTaskColumn({
    onEdit: (task: TaskData) => {
      if (task) {
        setTaskData(task);
      }
      setOpenEdit(true);
    },
    onSummary: (taskId) => {
      setTaskId(taskId);
      setOpen(true);
    },
  });
  return (
    <div className="py-2 px-4 flex flex-col gap-4">
      <TaskSummary open={open} setOpen={setOpen} taskId={taskId ?? ""}/>
      <TaskStatus
        open={openEdit}
        setOpen={setOpenEdit}
        taskData={taskData ?? ({} as TaskData)}
      />
      <TaskTable
        data={data ?? []}
        columns={columns}
        downloadCSV={() => {
          toast.error(`not implemented yet`);
        }}
      />
      {/* <Chrono
        items={items}
        theme={{
          primary: "#0079e6",
          cardBgColor: "#ffffff",
          cardTitleColor: "#1f2937",
          timelineBgColor: "#f5f5f5",
        }}
        darkMode={{ enabled: true }}
      /> */}
    </div>
  );
}
