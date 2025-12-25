import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { Task } from "@/Types/task";
import { Button } from "@/components/ui/button";
import TaskSheet from "./TaskSheet";
// import ProjectMember from "./ProjectMember";

type UserColumnProps = {
  // onEdit: (user: Task) => void;
  onDelete: (id: string) => void;
};

export function TaskColumn({
  // onEdit,
  onDelete,
}: UserColumnProps): ColumnDef<Task>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      minSize: 120,
      maxSize: 120,
      size: 120,
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
        return (
          <div>
            {format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
        );
      },
    },
    {
      accessorKey: "completedAt",
      header: "Completed At",
      minSize: 120,
      maxSize: 140,
      size: 140,
      cell: ({ row }) => {
        return (
          <div>
            {format(
              new Date(row.original.completedAt || new Date()),
              "dd/MM/yyyy HH:mm"
            )}
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        console.log(row);
        return (
          <div className="flex gap-4">
            <TaskSheet
              buttonTitle="Update Task"
              title="Update Task"
              description="Update an existing task here like assignee to different user and change task status, priority and estimate minutes."
              taskData={row.original}
            />
            <Button
              size="sm"
              onClick={() => onDelete(row.original.id)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}
