import z from "zod";

export const project = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["active", "archived"]),
});

export const addMember = z.object({
  name: z.string(),
  userId: z.string().optional(),
  ProjectId: z.string(),
  role: z.enum(["admin", "member", "manager"]),
});
