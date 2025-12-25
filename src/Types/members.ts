import type { Project } from "./project";
import type { User } from "./user";

export type Members = {
  id: string;
  role: "admin" | "member" | "manager";
  joinedAt: string;
  project: Project;
  user: User;
};

export type AddMember = {
  userId: string;
  projectId: string;
  role: "admin" | "member" | "manager";
};
