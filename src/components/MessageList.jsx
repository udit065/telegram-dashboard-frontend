import { useEffect, useRef, useState } from "react";

const container = { marginTop: 24 };

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
};

const search = {
    padding: 6,
    borderRadius: 6,
    border: "1px solid #ccc"
};

const chatBox = {
    height: 350,
    overflowY: "auto",
    background: "#f4f6f8",
    padding: 12,
    borderRadius: 8
};

const bubble = {
    background: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: "0 1px 2px rgba(0,0,0,.1)"
};

const meta = {
    fontSize: 12,
    color: "#666",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4
};


export default function MessageList({ messages }) {
    const bottomRef = useRef(null);
    const [query, setQuery] = useState("");

    // Auto scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const filteredMessages = messages.filter(m =>
        m.user.toLowerCase().includes(query.toLowerCase()) ||
        m.text.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={container}>
            <div style={header}>
                <h3>Live Messages</h3>
                <input
                    placeholder="Search user or text..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={search}
                />
            </div>

            <div style={chatBox}>
                {filteredMessages.map((m, i) => (
                    <div key={i} style={bubble}>
                        <div style={meta}>
                            <b>{m.user}</b>
                            <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <div>{m.text}</div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
