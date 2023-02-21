import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard } from '../../features/boards/boardSlice';
import CellAdder from '../CellAdder';
// import TagAdder from '../TagAdder';
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

  // const deleteTag = (e, i) => {
  //   e.preventDefault();
  //   boardData.tags.splice(i, 1);
  //   setBoardData({
  //     ...boardData,
  //   });
  // };

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
    navigate('/');
  };

  return (
    <div className="content">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <h3>Add new Bingofy board</h3>
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
        />
        <p className={boardData.cells.length !== 25 ? 'error' : ''}>
          {boardData.cells.length}/25
        </p>
        {showErrors && boardData.cells.length !== 25 && (
          <p className="error">A Bingofy board needs to have 25 cells</p>
        )}

        <ul className="cells-list">
          {boardData.cells.map((cell, i) => (
            <li key={i} className="cell">
              {cell}
              <button className="close" onClick={(e) => deleteCell(e, i)}>
                x
              </button>
            </li>
          ))}
        </ul>
        {/* <TagAdder
          handleTags={handleChange}
          boardData={boardData}
          setBoardData={setBoardData}
        />
        <ul className="tags-list">
          {boardData.tags.map((tag, i) => (
            <li key={i} className="tag">
              {tag}
              <button className="close" onClick={(e) => deleteTag(e, i)}>
                x
              </button>
            </li>
          ))}
        </ul> */}
        <button className="btn btn-block" type="submit">
          Add Board
        </button>
      </form>
    </div>
  );
}

export default BoardForm;
