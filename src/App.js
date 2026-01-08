import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ messages: 0, users: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then(res => res.json())
      .then(data => setStats(data));

    socket.on("newMessage", (data) => {
      setMessages(prev => [data, ...prev]);
      setStats(prev => ({
        messages: prev.messages + 1,
        users: prev.users
      }));
    });
  }, []);

  return (
    <div>
      <h2>Telegram Dashboard</h2>
      <p>Total Messages: {stats.messages}</p>
      <p>Total Users: {stats.users}</p>

      <hr />

      {messages.map((m, i) => (
        <p key={i}><b>{m.user}</b>: {m.text}</p>
      ))}
    </div>
  );
}

export default App;
