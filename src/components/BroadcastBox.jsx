import { useState } from "react";
import { socket } from "../services/socket";

export default function BroadcastBox() {
    const [message, setMessage] = useState("");

    const sendBroadcast = () => {
        if (!message.trim()) return;
        socket.emit("broadcastText", message);
        setMessage("");
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Broadcast Message</h3>
            <input
                type="text"
                placeholder="Type broadcast message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "300px", marginRight: "10px" }}
            />
            <button onClick={sendBroadcast}>Send</button>
        </div>
    );
}
