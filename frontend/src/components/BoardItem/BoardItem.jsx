import './BoardItem.css';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { BsLockFill } from 'react-icons/bs';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/edit/' + board._id);
  };

  const handlePlay = () => {
    navigate('/play/' + board._id);
  };

  return (
    <div className="board-item">
      <div className="controls">
        {board.isPrivate ? <BsLockFill /> : null}
        <button
          onClick={() => {
            dispatch(deleteBoard(board._id));
            localStorage.removeItem('board ' + board._id);
          }}
          className="delete"
        >
          <MdDelete />
        </button>
        {/* maybe dispatch getboard or something */}
        <button className="edit" onClick={handleEdit}>
          <MdEdit />
        </button>
      </div>
      <div>
        <h2>{board.title}</h2>
        <p className="category">{board.category}</p>
      </div>
      <button className="btn btn-reverse" onClick={handlePlay}>
        Play
      </button>
    </div>
  );
};

export default BoardItem;
