import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard } from '../../features/boards/boardSlice';
import CellAdder from '../CellAdder';
import './BoardForm.css';

function BoardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState({
    title: '',
    category: '',
    cells: [],
    tags: [],
    activeCells: [],
    private: true,
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    setBoardData({
      ...boardData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteCell = (e, i) => {
    e.preventDefault();
    boardData.cells.splice(i, 1);
    setBoardData({
      ...boardData,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (
      !boardData.title ||
      !boardData.category ||
      boardData.cells.length !== 25
    ) {
      return;
    }
    dispatch(createBoard(boardData));
    setBoardData({
      title: '',
      category: '',
      cells: [],
      tags: [],
    });
    toast.success('New board created!');
    navigate('/myboards');
  };

  return (
    <div className="content create">
      <form onSubmit={onSubmit} className="form">
        <h2>
          Add New <span className="logo">Bingofy</span> Board
        </h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={boardData.title}
            onChange={handleChange}
          />
          {showErrors && !boardData.title && (
            <p className="error">Title is required</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={boardData.category}
            onChange={handleChange}
          />
          {showErrors && !boardData.category && (
            <p className="error">Category is required</p>
          )}
        </div>
        <CellAdder
          handleCells={handleChange}
          boardData={boardData}
          setBoardData={setBoardData}
        >
          {/* TODO: limit cells to 25 */}
          <p className={boardData.cells.length !== 25 ? 'error' : ''}>
            {boardData.cells.length}/25
          </p>
          {showErrors && !boardData.cells.length < 25 && (
            <p className="error">PLEASE add 25 cells</p>
          )}
        </CellAdder>
        <div className="form-group">
          <button className="btn btn-block btn-primary" type="submit">
            Add Board
          </button>
        </div>
      </form>
      <div className="cells-list">
        {boardData.cells.map((cell, i) => (
          <div className="cell">
            <p>{cell}</p>
            <button className="delete" onClick={(e) => deleteCell(e, i)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardForm;
