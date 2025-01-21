import { useState, useEffect, useCallback } from 'react';
import BingoWin from '../BingoWin/BingoWin';
import './GameBoard.css';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const GameBoard = ({ board }) => {
  const { isLoading, isSuccess } = useSelector((state) => state.boards);
  const [isBingo, setIsBingo] = useState(false);
  const [boardData, setBoardData] = useState(board || {});

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
    if (boardData.activeCells.includes(index)) {
      setBoardData({
        ...boardData,
        activeCells: boardData.activeCells.filter((cell) => cell !== index),
      });
    } else {
      setBoardData({
        ...boardData,
        activeCells: [...boardData.activeCells, index],
      });
    }
  };
  const shuffleCells = () => {
    const shuffledCells = JSON.parse(JSON.stringify(boardData.cells)).sort(
      () => Math.random() - 0.5
    );
    setBoardData({
      ...boardData,
      cells: shuffledCells,
    });
  };

  const resetCells = () => {
    setBoardData({ ...boardData, activeCells: [] });
  };

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
    // Shuffle cells when the component mounts
    if (board?.cells) {
      const shuffledCells = board.cells.slice().sort(() => Math.random() - 0.5);
      setBoardData({
        ...board,
        cells: shuffledCells,
      });
    }
  }, []); // Run only once on mount

  useEffect(() => {
    checkBingo(boardData.activeCells);
  }, [checkBingo, boardData]);

  useEffect(() => {
    if (isSuccess) {
      setBoardData(board);
    }
  }, [board, isSuccess]);


  if (isLoading) return <Spinner />;

  if (isSuccess || board)
    return (
      <>
        <div className="buttons">
          <button
            title="Copy URL and share with friends"
            onClick={copyURL}
            className="btn btn-primary copy"
          >
            <FiCopy size={'1.3rem'} />
            Share
          </button>
          <h3>{boardData.title}</h3>
          {isBingo ? <h3>YOU WON!</h3> : null}
          {boardData?.activeCells?.length === 0 ? (
            <button className="btn btn-reverse shuffle" onClick={shuffleCells}>
              Shuffle
            </button>
          ) : (
            <button className="btn btn-reverse" onClick={resetCells}>
              Reset
            </button>
          )}
        </div>
        {isBingo ? <BingoWin /> : null}
        {boardData.cells && (
          <div className="board-grid">
            {boardData.cells.map((cell, index) => (
              <p
                className={`board-cell ${
                  boardData.activeCells.includes(index) ? 'active-cell' : ''
                }`}
                key={index}
                onClick={() => {
                  handleCellClick(index);
                  checkBingo(boardData.activeCells);
                }}
              >
                {cell}
              </p>
            ))}
          </div>
        )}
      </>
    );
};

export default GameBoard;
