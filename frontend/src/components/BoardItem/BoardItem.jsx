import './BoardItem.css';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { Link, useNavigate } from 'react-router-dom';
import { TiDelete, TiEdit } from 'react-icons/ti';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${board._id}`);
  };
  const handlePlay = () => {
    navigate(`/play/${board._id}`);
  };
  const handleDelete = () => {
    dispatch(deleteBoard(board._id));
    localStorage.removeItem('board ' + board._id);
  };

  return (
    <div className="board-item">
      <h2>{board.title}</h2>
      <p className="category">{board.category}</p>
      <button onClick={handleDelete} className="delete">
        <TiDelete />
      </button>
      <button onClick={handleEdit} className="edit">
        <TiEdit />
      </button>
      <button className="btn btn-reverse" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
};

export default BoardItem;
