import { useEffect, useState, useRef } from "react";
import { socket } from "../services/socket";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import '../App.css';

export default function BroadcastBox() {
    const [type, setType] = useState("text");
    const [text, setText] = useState("");
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        setFile(null);
        setCaption("");
    }, [type]);


    useEffect(() => {
        if (!file) {
            setPreviewSrc(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewSrc(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    useEffect(() => {
        socket.on("broadcastResult", (res) => {
            clearTimeout(timeoutRef.current);
            setLoading(false);

            if (res.success) {
                toast.success(`Sent to ${res.sent}/${res.total} users`, {
                    id: "broadcast"
                });
                setText("");
            } else {
                toast.error(res.error || "Broadcast failed", {
                    id: "broadcast"
                });
            }
        });

        return () => socket.off("broadcastResult");
    }, []);

    /* ---------- SEND TEXT ---------- */
    const sendText = () => {
        if (!text.trim()) return toast.error("Message cannot be empty");

        setLoading(true);
        toast.loading("Broadcasting message...", { id: "broadcast" });

        socket.emit("broadcastText", text);

        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            toast.error("Broadcast timeout. Try again.", {
                id: "broadcast"
            });
        }, 15000);
    };

    /* ---------- UPLOAD FILE ---------- */
    const uploadFile = async () => {
        if (!file) return toast.error("Please select a file");

        try {
            setLoading(true);
            toast.loading("Uploading & broadcasting...", { id: "upload" });

            const formData = new FormData();
            formData.append("file", file);
            formData.append("caption", caption);

            const res = await fetch(
                `http://localhost:5000/upload/${type}`,
                { method: "POST", body: formData }
            );

            if (!res.ok) throw new Error();

            toast.success("Broadcast sent successfully", { id: "upload" });
            setFile(null);
            setCaption("");
            setPreviewSrc(null);

        } catch (err) {
            toast.error("Media broadcast failed", { id: "upload" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ position: "relative" }}>
            <Spinner loading={loading} />
            <h3>Broadcast</h3>

            <select value={type} disabled={loading} onChange={(e) => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
            </select>

            <hr />

            {/* TEXT */}
            {type === "text" && (
                <>
                    <textarea
                        placeholder="Broadcast message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button disabled={loading} onClick={sendText}>
                        {loading ? "Sending..." : "Send Text"}
                    </button>
                    <div className="card" style={{ background: "#f9fafb" }}>
                        <h4>Preview</h4>
                        <div style={{ background: "#f9fafb", padding: 8 }}>
                            {text}
                        </div>
                    </div>
                </>
            )}

            {/* MEDIA */}
            {type !== "text" && (
                <>
                    <input
                        placeholder="Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <input
                        type="file"
                        accept={type === "photo" ? "image/*" : "video/mp4,video/webm,video/ogg"}
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button disabled={loading || !file} onClick={uploadFile}>
                        {loading ? "Sending..." : "Upload & Broadcast"}
                    </button>

                    <h4>Preview</h4>

                    {previewSrc && type === "photo" && (
                        <img src={previewSrc} alt="Preview" width="250" />
                    )}

                    {previewSrc && type === "video" && (
                        <video src={previewSrc} controls width="300" />
                    )}

                    {caption && <p><b>Caption:</b> {caption}</p>}
                </>
            )}
        </div>
    );
}
