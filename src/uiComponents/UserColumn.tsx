import type { getUser } from "@/Types/user";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const UserColumn: ColumnDef<getUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    // size: 70, // fixed width
    // minSize: 50,
    // maxSize: 70,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
    // size: 90, // fixed width
    // minSize: 100,
    // maxSize: 1000,
  },
  {
    accessorKey: "role",
    header: "Role",
    // size: 100, // fixed width
    // minSize: 100,
    // maxSize: 150,
    enableGlobalFilter: true,
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    // size: 100, // fixed width
    // minSize: 100,
    // maxSize: 150,
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <div>{format(new Date(createdAt), "dd/MM/yyyy HH:mm")}</div>;
    },
  },
];
