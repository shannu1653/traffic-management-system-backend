// =======================================
// Traffic WebSocket Service (FINAL)
// =======================================

let socket = null;
let reconnectTimer = null;
let manuallyClosed = false;

// 🔗 CHANGE ONLY THIS IN PRODUCTION
const BACKEND_WS_URL = "ws://localhost:8000";

export function connectTrafficSocket(onMessage) {
  // Prevent duplicate connections
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket;
  }

  const token = localStorage.getItem("access");
  if (!token) {
    console.warn("❌ No JWT token found. Traffic WebSocket skipped.");
    return null;
  }

  manuallyClosed = false;

  const WS_URL = `${BACKEND_WS_URL}/ws/traffic/?token=${token}`;
  console.log("🔌 Connecting Traffic WebSocket:", WS_URL);

  socket = new WebSocket(WS_URL);

  // ======================
  // OPEN
  // ======================
  socket.onopen = () => {
    console.log("✅ Traffic WebSocket connected");
  };

  // ======================
  // MESSAGE
  // ======================
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      // Accept initial + update payloads
      if (!("total_vehicles" in data)) return;

      onMessage?.(data);
    } catch (err) {
      console.error("❌ Traffic WebSocket JSON parse error", err);
    }
  };

  // ======================
  // ERROR
  // ======================
  socket.onerror = (err) => {
    console.warn("⚠️ Traffic WebSocket error", err);
  };

  // ======================
  // CLOSE
  // ======================
  socket.onclose = (event) => {
    console.warn("🔁 Traffic WebSocket closed:", event.code);
    socket = null;

    // Stop reconnect if manually closed
    if (manuallyClosed) return;

    // Stop reconnect on auth errors
    if (event.code === 4001 || event.code === 4003) return;

    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => {
      connectTrafficSocket(onMessage);
    }, 4000);
  };

  return socket;
}

// ======================
// DISCONNECT
// ======================
export function disconnectTrafficSocket() {
  manuallyClosed = true;

  if (socket) {
    socket.close(1000, "Client closed");
    socket = null;
  }

  clearTimeout(reconnectTimer);
  reconnectTimer = null;

  console.log("❌ Traffic WebSocket fully disconnected");
}
