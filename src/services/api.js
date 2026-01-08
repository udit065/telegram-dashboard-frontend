export const getStats = () =>
    fetch("http://localhost:5000/stats").then(res => res.json());
