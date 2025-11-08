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

export class GridManager {
  private grid: GridCell[][];
  private history: GridHistoryEntry[];
  private readonly GRID_SIZE = 10;

  constructor() {
    this.grid = this.initializeGrid();
    this.history = [];
  }

  private initializeGrid(): GridCell[][] {
    const grid: GridCell[][] = [];
    for (let i = 0; i < this.GRID_SIZE; i++) {
      grid[i] = [];
      for (let j = 0; j < this.GRID_SIZE; j++) {
        grid[i][j] = {
          character: null,
          playerId: null,
          timestamp: null,
        };
      }
    }
    return grid;
  }

  getGrid(): GridCell[][] {
    return this.grid;
  }

  updateCell(row: number, col: number, character: string, playerId: string): boolean {
    // Validate coordinates
    if (row < 0 || row >= this.GRID_SIZE || col < 0 || col >= this.GRID_SIZE) {
      return false;
    }

    // Check if cell is already occupied
    if (this.grid[row][col].character !== null) {
      return false;
    }

    // Update cell
    const timestamp = Date.now();
    this.grid[row][col] = {
      character,
      playerId,
      timestamp,
    };

    // Add to history
    this.history.push({
      row,
      col,
      character,
      playerId,
      timestamp,
    });

    return true;
  }

  getHistory(): GridHistoryEntry[] {
    return [...this.history];
  }

  resetGrid(): void {
    this.grid = this.initializeGrid();
    this.history = [];
  }
}

