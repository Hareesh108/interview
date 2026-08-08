import { useState, useCallback } from 'react';

function createGrid(rows, cols, fill = false) {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

function App({ rows = 3, cols = 3 }) {
  const [grid, setGrid] = useState(() => createGrid(rows, cols));

  const toggleCell = useCallback((rowIndex, colIndex) => {
    setGrid((prev) =>
      prev.map((row, r) =>
        r === rowIndex
          ? row.map((cell, c) => (c === colIndex ? !cell : cell))
          : row,
      ),
    );
  }, []);

  const activeCount = grid.flat().filter(Boolean).length;

  return (
    <div>
      <p>Active cells: {activeCount}</p>
      <div
        role="grid"
        aria-label={`${rows} by ${cols} toggle grid`}
        style={{ display: 'inline-grid', gap: 4 }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} role="row" style={{ display: 'flex', gap: 4 }}>
            {row.map((isActive, colIndex) => (
              <button
                key={colIndex}
                role="gridcell"
                aria-pressed={isActive}
                aria-label={`Row ${rowIndex + 1}, Column ${colIndex + 1}, ${isActive ? 'on' : 'off'}`}
                onClick={() => toggleCell(rowIndex, colIndex)}
                style={{
                  width: 48,
                  height: 48,
                  border: '2px solid #333',
                  borderRadius: 4,
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#22c55e' : '#f3f4f6',
                  transition: 'background-color 0.15s',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
