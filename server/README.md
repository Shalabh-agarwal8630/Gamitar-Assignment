# Multiplayer Unicode Grid Game - Server

A real-time multiplayer 10x10 grid web application where each player can select a block and fill it with a Unicode character. Built with React + Node.js + TypeScript.

## Features

- Real-time updates via Socket.IO
- Shared grid state across players
- Player count tracking
- Restriction after submission (1 minute cooldown)
- Historical grid replay

## Stack

- Server: Express, Socket.IO, TypeScript
- Communication: WebSocket

## Run Locally

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

The server will run on `http://localhost:3000` by default.

## AI Tools Disclosure

This project was developed using **Cursor AI** and **ChatGPT (GPT-5)** for code generation, structure planning, and documentation assistance.

