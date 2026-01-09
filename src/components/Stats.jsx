import '../App.css'
export default function Stats({ stats }) {
    return (
        <div className="stats-grid">
            <div className="card">
                <h4>Total Users</h4>
                <h2>{stats.users}</h2>
            </div>

            <div className="card">
                <h4>Total Messages</h4>
                <h2>{stats.messages}</h2>
            </div>
        </div>

    );
}
