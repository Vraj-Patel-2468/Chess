import { useState, useEffect } from "react";

export default function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket(url); 
    socket.onopen = () => setWs(socket);
    socket.onclose = () => setWs(null);
    return () => socket.close();
  }, [url]);
  return ws;
}
