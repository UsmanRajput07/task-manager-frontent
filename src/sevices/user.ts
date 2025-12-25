import type { CreateUser } from "@/Types/user";
import axiosWrapper from "./axiosWrapper";

const getuser = async () => {
  const res = await axiosWrapper.get("/v1/adminUser/gets");
  return res.data;
};

const createUser = async (data: CreateUser) => {
  const res = await axiosWrapper.post("/v1/adminUser/create", data);
  return res.data;
};
const updateUser = async (id: string, data: CreateUser) => {
  const res = await axiosWrapper.patch(`/v1/adminUser/update/${id}`, data);
  return res.data;
};

const deleteUser = async (id: string) => {
  const res = await axiosWrapper.delete(`/v1/adminUser/delete/${id}`);
  return res.data;
};

export default { getuser, createUser, updateUser, deleteUser };
