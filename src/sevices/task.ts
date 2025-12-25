import type { CreateTask } from "@/Types/task";
import axiosWrapper from "./axiosWrapper";

const create = async (data: CreateTask) => {
  const res = await axiosWrapper.post("/v1/task/create", data);
  return res.data;
};

const fetchTasks = async (projectId: string) => {
  const res = await axiosWrapper.get(`/v1/task/gets/${projectId}`);
  return res.data;
};

const updateTask = async (id: string, data: CreateTask) => {
  const res = await axiosWrapper.patch(`/v1/task/update/${id}`, data);
  return res.data;
};
export default { create, fetchTasks, updateTask };
