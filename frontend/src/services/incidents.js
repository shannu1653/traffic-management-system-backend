import api from "./api";

export const getIncidents = async () => {
  const res = await api.get("/api/incidents/");
  return res.data;
};

export const reportIncident = async (data) => {
  const res = await api.post("/api/incidents/", data);
  return res.data;
};
