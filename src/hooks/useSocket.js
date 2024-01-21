import socketIO from "socket.io-client";

export let socket;
export const ENDPOINT = "http://localhost:4000/";

export const useSocket = () => {
  const connect = () => {
    if (socket) return;
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("Connected");
    });
  };

  const join = (user) => {
    socket.emit("joined", { user });
  };

  const receiveMessage = (handleMessage) => {
    socket.on("sendMessage", handleMessage);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  };

  return { connect, join, disconnect, receiveMessage };
};
