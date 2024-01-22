import socketIO from "socket.io-client";

export let socket;
export const ENDPOINT = 'ws://my-chat-app-server.onrender.com';

export const useSocket = () => {
  const connect = () => {
    if(socket) return
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("sendMessage", () => {
      alert("Connected");
    });
  };

  const join = (user) => {
    socket.emit("joined", { user });
  };

  const receiveMessage = (handleMessage) => {
    if(socket){
      socket.on("sendMessage", handleMessage);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  };

  return { connect, join, disconnect, receiveMessage };
};
