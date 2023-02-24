import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard } from '../../features/boards/boardSlice';
import CellAdder from '../CellAdder';
import './BoardForm.css';

function BoardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [showErrors, setShowErrors] = useState(false);

  //FIXME: fix nested boards[boards] of state
  const board = useSelector((state) =>
    state.boards.boards.find((board) => board._id === boardId)
  );

  const [boardData, setBoardData] = useState({
    title: '',
    category: '',
    cells: [],
    activeCells: [],
    isPrivate: true,
  });

  useEffect(() => {
    if (board) {
      setBoardData(board);
    }
  }, [board]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setBoardData({
        ...boardData,
        [name]: checked,
      });
    } else {
      setBoardData({
        ...boardData,
        [name]: value,
      });
    }
  };

  const deleteCell = (e, i) => {
    e.preventDefault();
    setBoardData({
      ...boardData,
      cells: boardData.cells.filter((_, index) => index !== i),
    });
  };

  // TODO: update function to handle editing and creating
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !boardData.title ||
      !boardData.category ||
      boardData.cells.length !== 25
    ) {
      setShowErrors(true);
      return;
    }
    dispatch(createBoard(boardData));
    setBoardData({
      title: '',
      cells: [],
      category: '',
    });
    toast.success('New board created!');
    navigate('/myboards');
  };

  //FIXME: show 'edit' and 'update' instead of add when editing board
  return (
    <div className="content create">
      <form onSubmit={onSubmit} className="form">
        <h2>
          Add New <span className="logo">Bingofy</span> Board
        </h2>

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
        >
          <p className={boardData.cells.length !== 25 ? 'error' : ''}>
            {boardData.cells.length}/25
          </p>
          {showErrors && !boardData.cells.length < 25 && (
            <p className="error">PLEASE add 25 cells</p>
          )}
        </CellAdder>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="isPrivate"
            id="isPrivate"
            checked={boardData.isPrivate}
            onChange={handleChange}
          />
          <label htmlFor="isPrivate">Private</label>
        </div>
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
