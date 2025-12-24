import type { Create } from "@/Types/project";
import axiosWrapper from "./axiosWrapper";

const getProjects = async () => {
  const res = await axiosWrapper.get("/v1/project/gets");
  return res.data;
};

const createProject = async (data: Create) => {
  const res = await axiosWrapper.post("/v1/project/create", data);
  return res.data;
};

const deleteProject = async (id: string) => {
  const res = await axiosWrapper.delete(`/v1/project/delete/${id}`);
  return res.data;
};

const updateProject = async (id: string, data: Create) => {
  const res = await axiosWrapper.patch(`/v1/project/update/${id}`, data);
  return res.data;
};

export default { getProjects, createProject, deleteProject, updateProject };
