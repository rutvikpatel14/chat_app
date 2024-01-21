import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Component/Join/Join.js";
import Chat from "./Component/Chat/Chat.js";
import { useSocket } from "./hooks/useSocket.js";
import { useEffect } from "react";

function App() {
  const { connect, disconnect } = useSocket();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
