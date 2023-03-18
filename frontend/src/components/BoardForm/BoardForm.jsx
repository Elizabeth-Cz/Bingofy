import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard, updateBoard } from '../../features/boards/boardSlice';
import { MdAdd } from 'react-icons/md';
import './BoardForm.css';

function BoardForm({ data }) {
  const { id } = useParams();
  const board = data?.find((b) => b._id === id);
  console.log('boardForm', data);
  console.log('boardForm', board);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showErrors, setShowErrors] = useState(false);
  const [boardData, setBoardData] = useState(
    board || {
      title: '',
      cells: [],
      category: '',
      isPrivate: true,
    }
  );

  // access input cell for refocus
  const cellInputRef = useRef(null);
  // set each cell in cells array
  const [cell, setCell] = useState('');

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

  const handleCellAdd = (e) => {
    setCell(e.target.value);
  };

  const addCell = (event) => {
    event.preventDefault();
    if (cell !== '') {
      setBoardData({
        ...boardData,
        cells: [...boardData.cells, cell],
      });
    }
    setCell('');
    cellInputRef.current.focus();
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
    if (board) {
      dispatch(updateBoard(boardData));
      localStorage.removeItem('board ' + boardData._id);
      toast.success('Board updated');
      navigate('/myboards');
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

  // if (isLoading) return <Spinner />;

  return (
    <div className="content create">
      <form onSubmit={onSubmit} className="form">
        <h2>
          {id ? 'Edit Your ' : 'Add New '}
          <span className="logo">Bingofy</span> Board
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
        <div className="form-group">
          <label htmlFor="cell">Cells</label>
          <div className="add-input">
            <input
              type="text"
              name="cell"
              id="cell"
              value={cell}
              ref={cellInputRef}
              onChange={handleCellAdd}
            />
            {boardData.cells.length < 25 && (
              <button className="btn btn-reverse" onClick={addCell}>
                <MdAdd />
              </button>
            )}
            <h6>{boardData.cells.length}/25</h6>
          </div>
        </div>
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
            {id ? 'Update' : 'Add'} Board
          </button>
        </div>
      </form>
      <div className="cells-list">
        {boardData?.cells.map((cell, i) => (
          <div className="cell" key={i}>
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
