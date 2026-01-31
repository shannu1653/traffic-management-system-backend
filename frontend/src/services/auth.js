import api from "./api";

export const login = async ({ email, password }) => {
  const response = await api.post("/login/", {
    email,
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/register/", data);
  return response.data;
};
