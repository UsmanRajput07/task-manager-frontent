import { z } from "zod";

export const createUser = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "member"]),
});

export const updateUser = z.object({
  name: z.string().min(1),
  role: z.enum(["admin", "member"]),
});
