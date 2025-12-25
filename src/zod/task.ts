import { z } from "zod";

export const createTask = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  estimateMinutes: z.string(),
  assigneeId: z.string(),
  projectId: z.string(),
});
export const UpdateTask = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  estimateMinutes: z.string(),
  assigneeId: z.string(),
  projectId: z.string(),
  status: z.enum(["todo", "in_progress", "done"]),
});

export const UpdateSatus = z.object({
  status: z.enum(["todo", "in_progress", "done"]),
});
