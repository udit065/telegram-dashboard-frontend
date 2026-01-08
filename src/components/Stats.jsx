export default function Stats({ stats }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Stats</h3>
            <p>Total Messages: {stats.messages}</p>
            <p>Total Users: {stats.users}</p>
        </div>
    );
}
