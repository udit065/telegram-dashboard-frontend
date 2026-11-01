# 📡 Telegram Bot Dashboard (Frontend)

A real-time admin dashboard for a Telegram bot. Watch user messages arrive live, reply to them, broadcast text or media to every user, and track activity with charts.

**Backend:** [telegram-dashboard-backend](https://github.com/udit065/telegram-dashboard-backend)

## Features
- **Live message feed** over Socket.IO, so new messages appear without a refresh
- **Reply** to users straight from the dashboard
- **Broadcast** text, photos or videos to all users, from a URL or a file upload, with a local preview first
- **Stats**: total messages, users, replied and unreplied counts
- **Charts** with Chart.js
- Toast notifications and loading spinners

## Tech stack
React 18 · React Router · Socket.IO client · Chart.js (react-chartjs-2) · react-hot-toast

## Project structure
```
src/
├── pages/Dashboard.jsx
├── components/   BroadcastBox, MessageList, Stats, Chart, Spinner
├── layout/       PageContainer
└── services/     api.js (REST), socket.js (Socket.IO)
```

## Run locally
Start the [backend](https://github.com/udit065/telegram-dashboard-backend) first (it runs on `http://localhost:5000` by default). Then:
```bash
npm install
npm start      # http://localhost:3000
```

## Author
**Udit Yadav** · [GitHub](https://github.com/udit065) · [LinkedIn](https://www.linkedin.com/in/udit-yadav065)
