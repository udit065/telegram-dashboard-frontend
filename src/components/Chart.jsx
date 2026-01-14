import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart({ replied, unreplied }) {
    const data = {
        labels: ["Replied", "Unreplied"],
        datasets: [
            {
                label: "Messages",
                data: [replied, unreplied],
                backgroundColor: ["#15ee65ff", "#f87171"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Replied vs Unreplied Messages" },
        },
    };

    return (
        <div style={{ marginBottom: "30px", background: "#bfd4f1ff", padding: "20px", borderRadius: "10px" }}>
            <Bar data={data} options={options} />
        </div>
    );
}
