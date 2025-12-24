import axiosWrapper from "./axiosWrapper";

const getuser = async () => {
  const res = await axiosWrapper.get("/v1/adminUser/gets");
  return res.data;
};

const createUser = async (data: any) => {
  const res = await axiosWrapper.post("/v1/adminUser/create", data);
  return res.data;
};


export default { getuser , createUser};