export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
}

export type getUser = User & {
  createdAt: string;
  updatedAt: string;
};
