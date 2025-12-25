// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import type { Members } from "@/Types/members";
// import type { getUser } from "@/Types/user";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ProjectMember from "./ProjectMember";

type UserColumnProps = {
  onDelete: (id: string) => void;
};

export function MemberColumn({
  onDelete,
}: UserColumnProps): ColumnDef<Members>[] {
  return [
    {
      accessorKey: "user.name",
      header: "Name",
    },
    {
      accessorKey: "user.email",
      header: "Email",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "project.name",
      header: "Project",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "project.status",
      header: "Status",
      enableGlobalFilter: true,
    },
    {
      accessorKey: "joinedAt",
      header: "Joined At",
      cell: ({ row }) => {
        return (
          <div>
            {format(new Date(row.original.joinedAt), "dd/MM/yyyy HH:mm")}
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <ProjectMember
            projectData={row.original.user}
            buttonTitle="Update"
            title="Update Member"
            description="update user member details"
            projectId={row.original.project.id}
            memberId={row.original.id}
          />
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
