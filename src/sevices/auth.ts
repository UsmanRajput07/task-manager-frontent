import type { login, OrgSignup } from "@/Types/auth";
import axiosWrapper from "./axiosWrapper";

const adminSignup = async (data: OrgSignup) => {
  const response = await axiosWrapper.post(
    "/v1/organization/createAdmin",
    data
  );
  return response.data;
};
const login = async (data: login) => {
  const response = await axiosWrapper.post(
    "/v1/organization/adminlogin",
    data
  );
  return response.data;
};

export default {
  adminSignup,
  login,
};
