import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

/* ---------- STYLES ---------- */

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

const replyBtn = {
    marginTop: 6,
    fontSize: 12,
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#2563eb"
};

const replyBox = {
    marginTop: 12,
    padding: 10,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 6
};

const textarea = {
    width: "100%",
    minHeight: 60,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginTop: 6
};

const replyActions = {
    marginTop: 8,
    display: "flex",
    gap: 8
};

const repliedBadge = {
    fontSize: 11,
    color: "#065f46",
    fontWeight: "bold",
    marginTop: 4
};

/* ---------- COMPONENT ---------- */

export default function MessageList({ messages }) {
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    const [query, setQuery] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [sending, setSending] = useState(false);

    /* Auto scroll to latest message */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* Auto focus textarea when replying */
    useEffect(() => {
        textareaRef.current?.focus();
    }, [replyTo]);

    const filteredMessages = messages.filter(m =>
        m.user.toLowerCase().includes(query.toLowerCase()) ||
        m.text.toLowerCase().includes(query.toLowerCase())
    );

    const sendReply = async () => {
        if (!replyText.trim()) return;

        try {
            setSending(true);

            await fetch("http://localhost:5000/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: replyTo.user,
                    messageId: replyTo._id,
                    text: replyText
                })
            });

            toast.success("Reply sent");
            setReplyTo(null);
            setReplyText("");
        } catch {
            toast.error("Reply failed");
        } finally {
            setSending(false);
        }
    };

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
                    <div
                        key={i}
                        style={{
                            ...bubble,
                            background: m.replied ? "#e6fffa" : "#fff",
                            borderLeft: m.replied ? "4px solid #10b981" : "none"
                        }}
                    >
                        <div style={meta}>
                            <b>{m.user}</b>
                            <span>
                                {new Date(m.createdAt).toLocaleTimeString()}
                            </span>
                        </div>

                        <div>{m.text}</div>

                        {m.replied && (
                            <span style={repliedBadge}>Replied</span>
                        )}

                        {!m.replied && (
                            <button
                                style={replyBtn}
                                onClick={() => setReplyTo(m)}
                            >
                                Reply
                            </button>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {replyTo && (
                <div style={replyBox}>
                    <b>Replying to {replyTo.user}:</b>
                    <p style={{ fontSize: 13, color: "#555" }}>
                        {replyTo.text}
                    </p>

                    <textarea
                        ref={textareaRef}
                        style={textarea}
                        placeholder="Type reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />

                    <div style={replyActions}>
                        <button disabled={sending} onClick={sendReply}>
                            {sending ? "Sending..." : "Send"}
                        </button>
                        <button onClick={() => setReplyTo(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
