import './BoardItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { BsLockFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const BoardItem = ({ board }) => {
  const { user } = useSelector((state) => state.auth);
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
        {user && board.user === user._id ? (
          <>
            <button
              onClick={() => {
                dispatch(deleteBoard(board._id));
                localStorage.removeItem('board ' + board._id);
              }}
              className="delete"
            >
              <MdDelete />
            </button>
            <button className="edit" onClick={handleEdit}>
              <MdEdit />
            </button>
          </>
        ) : null}
      </div>
      <div className="info">
        <h2>{board.title}</h2>
        <p className="category">{board.category}</p>
      </div>
      <button
        title={!user ? 'Login to play' : null}
        className={`btn ${user ? 'btn-reverse' : 'btn-disabled'}`}
        onClick={handlePlay}
        disabled={!user ? true : false}
      >
        Play
      </button>
    </div>
  );
};

export default BoardItem;
