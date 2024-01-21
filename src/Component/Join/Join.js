import React, { useState } from "react";
import "./Join.css";
import logo from "../../Images/Logo.png";
import { Link } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

let user;

const Join = () => {
  const [name, setName] = useState("");
  const { join } = useSocket();

  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
    join(user);
  };
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} className="JoinBtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
