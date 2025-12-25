export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

export type CreateUser = {
  name: string;
  email?: string;
  password?: string;
  role: "admin" | "member";
};

export type getUser = User & {
  createdAt: string;
  updatedAt: string;
};
