# Quick Start Guide

## ✅ Setup Complete!

All dependencies have been installed and both projects are ready to run.

## 🚀 Running the Application

### Step 1: Start the Server

Open a terminal and run:

```bash
cd server
npm run dev
```

The server will start on `http://localhost:3000`

You should see:
```
Server running on port 3000
```

### Step 2: Start the Client

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

1. Open `http://localhost:5173` in your browser
2. Open the same URL in additional browser tabs/windows to test multiplayer
3. Click on any empty grid cell to add a Unicode character (emoji or symbol)
4. Watch updates appear in real-time across all connected clients!

## 🎮 How to Play

1. **Click an empty cell** - Select any empty cell in the 10x10 grid
2. **Enter a character** - Type an emoji (😀, 🎉, ⭐) or any Unicode symbol
3. **Submit** - Click Submit or press Enter
4. **Wait for cooldown** - After submitting, you'll have a 60-second cooldown
5. **View history** - Click "View Grid History" to see all updates chronologically

## 🔍 Testing Multiplayer

1. Open multiple browser tabs/windows to `http://localhost:5173`
2. Each tab represents a different player
3. Watch the player count update in real-time
4. Make updates in one tab and see them appear instantly in others!

## 📁 Project Structure

```
Gamitar/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── Grid.tsx
│       │   └── PlayerCount.tsx
│       └── App.tsx
│
└── server/          # Express + Socket.IO backend
    └── src/
        ├── socket/
        │   ├── gridManager.ts
        │   └── playerManager.ts
        └── index.ts
```

## 🛠️ Available Commands

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## ✨ Features

- ✅ Real-time multiplayer grid updates
- ✅ 10x10 clickable grid
- ✅ Unicode character support (emojis, symbols)
- ✅ Player count tracking
- ✅ 60-second cooldown after submission
- ✅ Grid history with timestamps
- ✅ Beautiful, responsive UI

## 🐛 Troubleshooting

**Server won't start?**
- Make sure port 3000 is not in use
- Check that all dependencies are installed: `cd server && npm install`

**Client won't connect?**
- Make sure the server is running first
- Check browser console for errors
- Verify server is on `http://localhost:3000`

**No real-time updates?**
- Check that both server and client are running
- Open browser developer tools and check for WebSocket connection errors
- Verify CORS settings in server if accessing from different origin

## 📝 Notes

- Grid state is stored in memory (resets when server restarts)
- Player sessions are temporary (cleared on disconnect)
- Cooldown timer is synchronized between client and server
- All updates are broadcast to all connected clients in real-time

Enjoy your multiplayer Unicode grid game! 🎉

