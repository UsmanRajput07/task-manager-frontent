import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { UserTasks } from "@/Types/task";
import { Button } from "@/components/ui/button";

// import ProjectMember from "./ProjectMember";

type UserColumnProps = {
  onEdit: (taskId: string) => void;
  // onDelete: (id: string) => void;
};

export function UserTaskColumn({
  onEdit,
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
      maxSize: 120,
      size: 120,
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
      minSize: 120,
      maxSize: 120,
      size: 120,
      cell: ({ row }) => {
        return (
          <div>
            <Button onClick={() => onEdit(row.original.id)}>
              Update Status
            </Button>
          </div>
        );
      },
    },
  ];
}
