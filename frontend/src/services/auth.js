export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
