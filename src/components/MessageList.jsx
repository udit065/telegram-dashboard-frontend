export default function MessageList({ messages }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Live Messages</h3>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                {messages.map((m, i) => (
                    <p key={i}>
                        <b>{m.user}</b>: {m.text}
                    </p>
                ))}
            </div>
        </div>
    );
}
