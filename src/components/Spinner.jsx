import { ClipLoader } from "react-spinners";

export default function Spinner({ loading }) {
    if (!loading) return null;

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10
        }}>
            <ClipLoader size={40} />
        </div>
    );
}
