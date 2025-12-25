import type { AddMember } from "@/Types/members";
import axiosWrapper from "./axiosWrapper";

const addMember = async (data: AddMember) => {
  const res = await axiosWrapper.post("/v1/projectMember/create", data);
  return res.data;
};

const fetchMembers = async (projectId: string) => {
  const res = await axiosWrapper.get(`/v1/projectMember/gets/${projectId}`);
  return res.data;
};

const deleteMember = async (id: string) => {
  const res = await axiosWrapper.delete(`/v1/projectMember/delete/${id}`);
  return res.data;
};

export default { addMember, fetchMembers, deleteMember };
