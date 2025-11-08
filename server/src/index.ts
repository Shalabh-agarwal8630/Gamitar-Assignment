import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GridManager } from './socket/gridManager';
import { PlayerManager } from './socket/playerManager';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const gridManager = new GridManager();
const playerManager = new PlayerManager();

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  // Add player on connection
  playerManager.addPlayer(socket.id);
  
  // Send initial grid state and player count
  socket.emit('grid-state', gridManager.getGrid());
  socket.emit('player-count', playerManager.getPlayerCount());
  
  // Broadcast updated player count to all clients
  io.emit('player-count', playerManager.getPlayerCount());
  
  // Handle grid update
  socket.on('update-cell', (data: { row: number; col: number; character: string }) => {
    const player = playerManager.getPlayer(socket.id);
    
    if (!player) {
      socket.emit('error', 'Player not found');
      return;
    }
    
    // Check if player can update (hasn't submitted yet or cooldown expired)
    if (!playerManager.canPlayerUpdate(socket.id)) {
      socket.emit('error', 'You cannot update the grid at this time');
      return;
    }
    
    // Update grid
    const success = gridManager.updateCell(data.row, data.col, data.character, socket.id);
    
    if (success) {
      // Mark player as having submitted
      playerManager.markPlayerSubmitted(socket.id);
      
      // Broadcast updated grid to all clients
      io.emit('grid-state', gridManager.getGrid());
      
      // Send confirmation to the player
      socket.emit('update-success', {
        row: data.row,
        col: data.col,
        character: data.character,
      });
      
      // If timed restriction is enabled, start cooldown
      playerManager.startCooldown(socket.id);
    } else {
      socket.emit('error', 'Cell is already occupied');
    }
  });
  
  // Handle grid history request
  socket.on('request-history', () => {
    const history = gridManager.getHistory();
    socket.emit('grid-history', history);
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    playerManager.removePlayer(socket.id);
    io.emit('player-count', playerManager.getPlayerCount());
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

