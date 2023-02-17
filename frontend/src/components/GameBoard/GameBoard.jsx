import { useState, useEffect, useCallback } from 'react';
import Spinner from '../Spinner/Spinner';
import './GameBoard.css';

const GameBoard = ({ board }) => {
  const localStorageData = localStorage.getItem('board ' + board._id)
    ? JSON.parse(localStorage.getItem('board ' + board._id))
    : null;
  const [boardInfo, setboardInfo] = useState(localStorageData || board);
  const [isBingo, setIsBingo] = useState(false);
  const checkBingo = useCallback((activeCells) => {
    let bingo = false;
    const winConditions = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    const activeSet = new Set(activeCells);

    winConditions.forEach((condition) => {
      if (condition.every((cell) => activeSet.has(cell))) {
        bingo = true;
      }
    });
    setIsBingo(bingo);
    return bingo;
  }, []);

  const handleCellClick = (index) => {
    if (boardInfo.activeCells.includes(index)) {
      setboardInfo({
        ...boardInfo,
        activeCells: boardInfo.activeCells.filter((cell) => cell !== index),
      });
    } else {
      setboardInfo({
        ...boardInfo,
        activeCells: [...boardInfo.activeCells, index],
      });
    }
  };
  const shuffleCells = () => {
    setboardInfo({
      ...boardInfo,
      cells: boardInfo.cells.slice().sort(() => Math.random() - 0.5),
    });
  };

  const resetCells = () => {
    setboardInfo({ ...boardInfo, activeCells: [] });
  };

  const saveBoard = useCallback(() => {
    localStorage.setItem('board ' + board._id, JSON.stringify(boardInfo));
  }, [boardInfo, board]);

  useEffect(() => {
    checkBingo(boardInfo.activeCells);
    saveBoard();
  }, [saveBoard, checkBingo, boardInfo]);

  if (!board || !boardInfo) {
    return <Spinner />;
  }

  return (
    <div className="content">
      <div className="buttons">
        <h3>Bingofy {boardInfo.title}</h3>
        <h2 className={isBingo ? 'tracking-in-expand-fwd bingo' : 'no-bingo'}>
          BINGO
        </h2>

        {boardInfo.activeCells.length === 0 ? (
          <button className="btn" onClick={shuffleCells}>
            Shuffle Cells
          </button>
        ) : (
          <button className="btn" onClick={resetCells}>
            Reset
          </button>
        )}
      </div>

      <div className="board-grid">
        {boardInfo.cells.map((cell, index) => (
          <div
            className={`board-cell ${
              boardInfo.activeCells.includes(index) ? 'active' : ''
            }`}
            key={index}
            onClick={() => {
              handleCellClick(index);
              checkBingo(boardInfo.activeCells);
            }}
          >
            <p>{cell}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
