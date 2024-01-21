import React, { useEffect, useState } from "react";
import { socket, useSocket } from "../../hooks/useSocket";
import "./Chat.css";
import SendImage from "../../Images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { user } from "../Join/Join";
import closeIcon from "../../Images/close.png";

const Chat = () => {
  const { receiveMessage } = useSocket();
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      setChatMessage([...chatMessage, data]);
    };

    receiveMessage(handleMessage);
    return () => {
      socket.off();
    };
  }, []);

  const send = () => {
    const message = document.getElementById("ChatInput").value;
    const id = socket.id;
    socket.emit("message", { message, id, user });
    document.getElementById("ChatInput").value = "";
  };

  return (
    <div className="ChatPage">
      <div className="ChatContainer">
        <div className="Header">
          <h2>Chat App</h2>
          <a href="/">
            <img src={closeIcon} alt="close" />
          </a>
        </div>
        <ReactScrollToBottom className="ChatBox">
          {chatMessage.map((item, i) => (
            <Message
              key={i}
              user={item.id === socket.id ? "" : item.user}
              message={item.message}
              classs={item.id === socket.id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="ChatInput"
          />
          <button onClick={send} className="SendBtn">
            <img src={SendImage} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
