import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/api/accounts/profile/");
  return response.data;
};
