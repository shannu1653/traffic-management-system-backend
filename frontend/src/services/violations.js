import api from "./api";

export const getViolations = async () => {
  const res = await api.get("/api/violations/");
  return res.data;
};
