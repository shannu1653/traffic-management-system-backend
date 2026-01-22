import api from "./api";

export const getTrafficList = async () => {
  const res = await api.get("/api/traffic/");
  return res.data;
};
