import { useState } from 'react';
import { GridCell } from '../App';
import './Grid.css';

interface GridProps {
  grid: GridCell[][];
  onCellUpdate: (row: number, col: number, character: string) => void;
  disabled: boolean;
}

const Grid: React.FC<GridProps> = ({ grid, onCellUpdate, disabled }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleCellClick = (row: number, col: number) => {
    if (disabled || grid[row]?.[col]?.character !== null) {
      return;
    }

    setSelectedCell({ row, col });
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow any Unicode character (including emojis)
    if (value.length <= 1) {
      setInputValue(value);
    }
  };

  const handleSubmit = () => {
    if (selectedCell && inputValue.trim()) {
      onCellUpdate(selectedCell.row, selectedCell.col, inputValue.trim());
      setSelectedCell(null);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setSelectedCell(null);
      setInputValue('');
    }
  };

  // Initialize empty grid if not provided
  const displayGrid = grid.length > 0 ? grid : Array(10).fill(null).map(() => 
    Array(10).fill(null).map(() => ({ character: null, playerId: null, timestamp: null }))
  );

  return (
    <div className="grid-container">
      <div className="grid">
        {displayGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => {
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const isOccupied = cell.character !== null;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-cell ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''} ${disabled ? 'disabled' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell.character || (isSelected ? '?' : '')}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedCell && (
        <div className="input-modal">
          <div className="input-modal-content">
            <h3>Enter Unicode Character</h3>
            <p>Click on a cell and enter an emoji or symbol</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter emoji or symbol..."
              autoFocus
              maxLength={1}
            />
            <div className="input-modal-buttons">
              <button onClick={handleSubmit} disabled={!inputValue.trim()}>
                Submit
              </button>
              <button onClick={() => { setSelectedCell(null); setInputValue(''); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;

