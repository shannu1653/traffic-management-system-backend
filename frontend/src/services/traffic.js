import api from "./api";

/* ===============================
   TRAFFIC API SERVICES
================================ */

/**
 * Initial traffic stats (User / Officer / Admin)
 */
export const getTrafficStats = async () => {
  const response = await api.get("/traffic/stats/");
  return response;
};

/**
 * Alias for components expecting live traffic
 * (kept for backward compatibility)
 */
export const getLiveTraffic = async () => {
  const response = await api.get("/traffic/stats/");
  return response;
};

/**
 * Optional: traffic signals
 */
export const getTrafficSignals = async () => {
  const response = await api.get("/traffic/signals/");
  return response;
};
