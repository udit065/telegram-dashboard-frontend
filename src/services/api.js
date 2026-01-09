const BASE_URL = "http://localhost:5000";

export const getStats = () =>
    fetch(`${BASE_URL}/stats`)
        .then(res => res.json());

export const getMessages = () =>
    fetch(`${BASE_URL}/messages`)
        .then(res => res.json());
