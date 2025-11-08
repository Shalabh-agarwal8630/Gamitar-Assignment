# Unicode Grid Game - Project Summary

## Project Structure

```
Gamitar/
├── client/              # React + Vite + TypeScript client
│   ├── src/
│   │   ├── components/
│   │   │   ├── Grid.tsx
│   │   │   ├── Grid.css
│   │   │   ├── PlayerCount.tsx
│   │   │   └── PlayerCount.css
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
└── server/              # Express + Socket.IO + TypeScript server
    ├── src/
    │   ├── socket/
    │   │   ├── gridManager.ts
    │   │   └── playerManager.ts
    │   └── index.ts
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Features Implemented

### Core Features ✅
1. **10x10 Grid Display** - Clickable blocks in a 10x10 grid
2. **Unicode Character Input** - Players can enter emojis or symbols
3. **One-Time Submission** - Players can only update one block (until cooldown expires)
4. **Real-Time Updates** - All updates broadcast via Socket.IO
5. **Player Count** - Real-time display of online players
6. **Shared Grid State** - Stored on server, synchronized across all clients

### Optional Features ✅
1. **Timed Restriction** - 60-second cooldown after submission
2. **Grid History** - Complete history tracking with timestamps
3. **History Viewer** - Modal to view all grid updates chronologically

## How to Run

### Server Setup
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:3000`

### Client Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

## Technical Stack

### Client
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.8
- Socket.IO Client 4.6.1

### Server
- Express 4.18.2
- Socket.IO 4.6.1
- TypeScript 5.3.3
- tsx (for development)

## Architecture

### Client Components
- **App.tsx** - Main application component, manages socket connection and state
- **Grid.tsx** - 10x10 grid component with cell selection and input modal
- **PlayerCount.tsx** - Displays real-time player count

### Server Modules
- **index.ts** - Express server setup and Socket.IO event handlers
- **gridManager.ts** - Manages grid state and history
- **playerManager.ts** - Manages player sessions, submissions, and cooldowns

## Socket.IO Events

### Client → Server
- `update-cell` - Update a grid cell with a character
- `request-history` - Request grid history

### Server → Client
- `grid-state` - Current grid state
- `player-count` - Current number of online players
- `update-success` - Confirmation of successful update
- `error` - Error message
- `grid-history` - Grid history data

## Development Notes

- All code follows TypeScript strict mode
- Modular architecture with separation of concerns
- Clean, readable code with proper error handling
- Responsive UI with modern styling
- Real-time synchronization via WebSockets

## AI Tools Disclosure

This project was developed using ChatGPT for structure planning, and documentation assistance.

