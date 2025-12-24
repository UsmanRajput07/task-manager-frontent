import z from "zod";

export const project = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["active", "archived"]),
});
