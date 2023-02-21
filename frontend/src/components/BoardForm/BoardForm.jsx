import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBoard, updateBoard } from '../../features/boards/boardSlice';
import CellAdder from '../CellAdder';
// import TagAdder from '../TagAdder';
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
    tags: [],
    activeCells: [],
    private: true,
  });

  useEffect(() => {
    if (board) {
      setBoardData(board);
    }
  }, [board]);

  const handleChange = (e) => {
    setBoardData({
      ...boardData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteCell = (e, i) => {
    e.preventDefault();
    // Use the `filter` method to remove the cell at the specified index
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
    if (boardId) {
      localStorage.removeItem(`board ${boardId}`);
      dispatch(updateBoard({ ...boardData, _id: boardId }));
      toast.success('Board updated!');
      // navigate('/myboards');
      return;
    } else {
      dispatch(createBoard(boardData));
      setBoardData({
        title: '',
        category: '',
        cells: [],
        tags: [],
      });
      toast.success('New board created!');
      navigate('/');
    }
  };

  //FIXME: show 'edit' and 'update' instead of add when editing board

  return (
    <div className="content">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <h3>{boardId ? 'Edit Board' : 'Add New Board'}</h3>
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
