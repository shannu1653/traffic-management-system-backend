import api from "./api";

/* Get all incidents */
export const getIncidents = async () => {
  const res = await api.get("/incidents/");
  return res.data;
};

/* Create incident */
export const createIncident = async (payload) => {
  const res = await api.post("/incidents/", payload);
  return res.data;
};

/* Update incident */
export const updateIncident = async (id, payload) => {
  const res = await api.put(`/incidents/${id}/`, payload);
  return res.data;
};
