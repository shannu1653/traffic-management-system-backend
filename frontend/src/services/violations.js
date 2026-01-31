import api from "./api";

/* Get violations */
export const getViolations = async () => {
  const res = await api.get("/violations/");
  return res.data;
};

/* Create violation */
export const createViolation = async (payload) => {
  const res = await api.post("/violations/", payload);
  return res.data;
};
