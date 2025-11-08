import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Grid from './components/Grid';
import PlayerCount from './components/PlayerCount';
import './App.css';

export interface GridCell {
  character: string | null;
  playerId: string | null;
  timestamp: number | null;
}

export interface GridHistoryEntry {
  row: number;
  col: number;
  character: string;
  playerId: string;
  timestamp: number;
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);
  const [history, setHistory] = useState<GridHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Connect to server
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Listen for grid state updates
    newSocket.on('grid-state', (gridState: GridCell[][]) => {
      setGrid(gridState);
    });

    // Listen for player count updates
    newSocket.on('player-count', (count: number) => {
      setPlayerCount(count);
    });

    // Listen for update success
    newSocket.on('update-success', () => {
      setHasSubmitted(true);
      setError(null);
      // Start cooldown timer (60 seconds)
      setCooldownRemaining(60);
    });

    // Listen for errors
    newSocket.on('error', (errorMessage: string) => {
      setError(errorMessage);
    });

    // Listen for grid history
    newSocket.on('grid-history', (historyData: GridHistoryEntry[]) => {
      setHistory(historyData);
      setShowHistory(true);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldownRemaining === null || cooldownRemaining <= 0) {
      if (cooldownRemaining === 0) {
        setHasSubmitted(false);
        setCooldownRemaining(null);
      }
      return;
    }

    const timer = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev === null || prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const handleCellUpdate = (row: number, col: number, character: string) => {
    if (!socket || hasSubmitted) {
      return;
    }

    socket.emit('update-cell', { row, col, character });
  };

  const handleRequestHistory = () => {
    if (!socket) return;
    socket.emit('request-history');
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Unicode Grid Game</h1>
        <PlayerCount count={playerCount} />
      </div>

      {error && <div className="error-message">{error}</div>}

      {hasSubmitted && cooldownRemaining !== null && cooldownRemaining > 0 && (
        <div className="cooldown-message">
          Cooldown: {cooldownRemaining}s remaining
        </div>
      )}

      {hasSubmitted && cooldownRemaining === null && (
        <div className="info-message">You can now update the grid again!</div>
      )}

      <Grid
        grid={grid}
        onCellUpdate={handleCellUpdate}
        disabled={hasSubmitted}
      />

      <button onClick={handleRequestHistory} className="history-button">
        View Grid History
      </button>

      {showHistory && (
        <div className="history-modal" onClick={() => setShowHistory(false)}>
          <div className="history-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal-header">
              <h2>Grid History</h2>
              <button className="close-button" onClick={() => setShowHistory(false)}>
                ×
              </button>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="no-history">No history available yet.</p>
              ) : (
                history.map((entry, index) => (
                  <div key={index} className="history-entry">
                    <span className="history-index">#{index + 1}</span>
                    <span className="history-character">{entry.character}</span>
                    <span className="history-position">
                      Row {entry.row + 1}, Col {entry.col + 1}
                    </span>
                    <span className="history-time">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

