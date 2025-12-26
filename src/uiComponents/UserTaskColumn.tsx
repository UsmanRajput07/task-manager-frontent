import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { TaskData, UserTasks } from "@/Types/task";
import { Button } from "@/components/ui/button";

// import ProjectMember from "./ProjectMember";

type UserColumnProps = {
  onEdit: (task: TaskData) => void;
  // onDelete: (id: string) => void;
  onSummary: (taskId: string) => void;
};

export function UserTaskColumn({
  onEdit,
  onSummary,
}: UserColumnProps): ColumnDef<UserTasks>[] {
  return [
    {
      accessorKey: "project.name",
      header: "Project",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "title",
      header: "Title",
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "description",
      header: "Description",
      minSize: 120,
      maxSize: 120,
      size: 120,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableGlobalFilter: true,
      minSize: 50,
      maxSize: 50,
      size: 50,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      enableGlobalFilter: true,
      minSize: 50,
      maxSize: 50,
      size: 50,
    },
    {
      accessorKey: "estimateMinutes",
      header: "Estimate Minutes",
      enableGlobalFilter: true,
      minSize: 100,
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      minSize: 120,
      maxSize: 120,
      size: 120,
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <div>
            {date &&
              format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
        );
      },
    },
    {
      accessorKey: "completedAt",
      header: "Completed At",
      minSize: 120,
      maxSize: 120,
      size: 120,
      cell: ({ row }) => {
        const date = row.original.completedAt;
        return <div>{date && format(new Date(date), "dd/MM/yyyy HH:mm")}</div>;
      },
    },
    {
      header: "Action",
      minSize: 120,
      maxSize: 120,
      size: 120,
      cell: ({ row }) => {
        return (
          <div>
            <Button
              onClick={() =>
                onEdit({
                  id: row.original.id,
                  status: row.original.status,
                })
              }
            >
              Update Status
            </Button>
          </div>
        );
      },
    },
    {
      header: "task summary",
      minSize: 80,
      maxSize: 80,
      size: 80,
      cell: ({ row }) => {
        return (
          <div>
            <Button onClick={() => onSummary(row.original.id)}>Summary</Button>
          </div>
        );
      },
    },
  ];
}
