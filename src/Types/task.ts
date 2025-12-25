import type { User } from "./user";

export type Task = {
  id: string;
  organizationId: string;
  projectId: string;
  assigneeId: string;
  title: string;
  description: null;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  estimateMinutes: 120;
  createdAt: string;
  completedAt: null | string;
  assignee: User;
  tags: [];
};

export type UserTasks = Omit<Task, "assignee"> & {
  project: {
    id: string;
    name: string;
  };
};

export type CreateTask = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimateMinutes: string;
  assigneeId: string;
  projectId: string;
};
