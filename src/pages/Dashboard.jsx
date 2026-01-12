import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { getStats, getMessages } from "../services/api";
import Stats from "../components/Stats";
import MessageList from "../components/MessageList";
import BroadcastBox from "../components/BroadcastBox";
import PageContainer from "../layout/PageContainer";

export default function Dashboard() {
    const [stats, setStats] = useState({ messages: 0, users: 0 });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getStats().then(setStats);
        getMessages().then(setMessages);

        socket.on("newMessage", (data) => {
            setMessages(prev => [...prev.slice(-49), data]);
            setStats(prev => ({
                ...prev,
                messages: prev.messages + 1
            }));
        });

        return () => socket.off("newMessage");
    }, []);
    useEffect(() => {
        socket.on("messageReplied", (updatedMsg) => {
            setMessages(prev => {
                const exists = prev.some(m => m._id === updatedMsg._id);

                // If message exists → update
                if (exists) {
                    return prev.map(m =>
                        m._id === updatedMsg._id ? updatedMsg : m
                    );
                }

                // If not → append (safety net)
                return [...prev, updatedMsg];
            });
        });

        return () => socket.off("messageReplied");
    }, []);


    return (
        <PageContainer title="Telegram Bot Dashboard">
            <Stats stats={stats} />
            <BroadcastBox />
            <MessageList messages={messages} />
        </PageContainer>
    );
}
