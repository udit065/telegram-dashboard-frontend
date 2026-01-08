import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { getStats } from "../services/api";

import Stats from "../components/Stats";
import MessageList from "../components/MessageList";
import BroadcastBox from "../components/BroadcastBox";

export default function Dashboard() {
    const [stats, setStats] = useState({ messages: 0, users: 0 });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Initial stats
        getStats().then(setStats);

        // Listen for live messages
        socket.on("newMessage", (data) => {
            setMessages((prev) => [data, ...prev]);
            setStats((prev) => ({
                ...prev,
                messages: prev.messages + 1
            }));
        });

        return () => {
            socket.off("newMessage");
        };
    }, []);

    return (
        <div>
            <h2>Telegram Bot Dashboard</h2>

            <Stats stats={stats} />
            <BroadcastBox />
            <MessageList messages={messages} />
        </div>
    );
}
