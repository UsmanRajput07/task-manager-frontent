export type Project = {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  createdById: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
};

export type Create = {
  name: string;
  description: string;
  status: "active" | "archived";
};
