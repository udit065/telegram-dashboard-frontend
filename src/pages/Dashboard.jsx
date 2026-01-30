import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { getStats, getMessages } from "../services/api";
import Stats from "../components/Stats";
// import Chart from "../components/Chart";
import MessageList from "../components/MessageList";
import BroadcastBox from "../components/BroadcastBox";
import PageContainer from "../layout/PageContainer";

export default function Dashboard() {
    const [stats, setStats] = useState({ messages: 0, users: 0, replied: 0, unreplied: 0 });
    const [messages, setMessages] = useState([]);

    // Initial fetch
    useEffect(() => {
        getStats().then(setStats);
        getMessages().then(setMessages);

        socket.on("newMessage", (data) => {
            setMessages(prev => [...prev.slice(-49), data]);
            setStats(prev => ({
                ...prev,
                messages: prev.messages + 1,
                unreplied: prev.unreplied + 1
            }));
        });

        return () => socket.off("newMessage");
    }, []);

    // Update on reply
    useEffect(() => {
        socket.on("messageReplied", (updatedMsg) => {
            setMessages(prev => {
                const exists = prev.some(m => m._id === updatedMsg._id);
                if (exists) {
                    return prev.map(m => m._id === updatedMsg._id ? updatedMsg : m);
                }
                return [...prev, updatedMsg];
            });

            setStats(prev => ({
                ...prev,
                replied: prev.replied + 1,
                unreplied: Math.max(prev.unreplied - 1, 0)
            }));
        });

        return () => socket.off("messageReplied");
    }, []);

    return (
        <PageContainer title="Telegram Bot Dashboard">
            <Stats stats={stats} />
            {/* <Chart replied={stats.replied} unreplied={stats.unreplied} /> */}
            <BroadcastBox />
            <MessageList messages={messages} />
        </PageContainer>
    );
}
