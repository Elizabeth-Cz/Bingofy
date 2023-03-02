import { useState, useEffect, useCallback } from 'react';
import BingoWin from '../BingoWin/BingoWin';
import Spinner from '../Spinner/Spinner';
import './GameBoard.css';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';

const GameBoard = ({ board }) => {
  const localStorageData = localStorage.getItem('board ' + board._id)
    ? JSON.parse(localStorage.getItem('board ' + board._id))
    : null;

  const [boardInfo, setboardInfo] = useState(localStorageData || board);
  const [isBingo, setIsBingo] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyURL = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    toast.success('URL copied to clipboard');
  };

  useEffect(() => {
    if (
      localStorageData &&
      JSON.stringify(localStorageData) !== JSON.stringify(board)
    ) {
      setboardInfo(localStorageData);
    } else {
      setboardInfo(board);
    }

    checkBingo(boardInfo.activeCells);
    saveBoard();
  }, [
    boardInfo.activeCells,
    boardInfo.cells,
    checkBingo,
    saveBoard,
    board,
    localStorageData,
  ]);

  if (!board || !boardInfo) {
    return <Spinner />;
  }

  return (
    <>
      <div className="content">
        <div className="buttons">
          <button
            title="Copy URL and share with friends"
            onClick={copyURL}
            className="btn btn-primary copy"
          >
            <FiCopy size={'1.3rem'} />
            Share
          </button>
          <h3>{boardInfo.title}</h3>
          {isBingo ? <h3>YOU WON!</h3> : null}
          {boardInfo.activeCells.length === 0 ? (
            <button className="btn btn-reverse" onClick={shuffleCells}>
              Shuffle
            </button>
          ) : (
            <button className="btn btn-reverse" onClick={resetCells}>
              Reset
            </button>
          )}
        </div>
        {isBingo ? <BingoWin /> : null}
        <div className="board-grid">
          {boardInfo.cells.map((cell, index) => (
            <p
              className={`board-cell ${
                boardInfo.activeCells.includes(index) ? 'active-cell' : ''
              }`}
              key={index}
              onClick={() => {
                handleCellClick(index);
                checkBingo(boardInfo.activeCells);
              }}
            >
              {cell}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameBoard;
