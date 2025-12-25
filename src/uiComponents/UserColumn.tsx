import { Button } from "@/components/ui/button";
import type { getUser } from "@/Types/user";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type UserColumnProps = {
  onEdit: (user: getUser) => void;
  onDelete: (id: string) => void;
};

export function UserColumn({
  onEdit,
  onDelete,
}: UserColumnProps): ColumnDef<getUser>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <div>
            {format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Button size="sm" onClick={() => onEdit(row.original)}>
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => onDelete(row.original.id)}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
}
