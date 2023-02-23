import './BoardItem.css';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();

  return (
    <div className="board-item">
      <div className="controls">
        <button
          onClick={() => {
            dispatch(deleteBoard(board._id));
            localStorage.removeItem('board ' + board._id);
          }}
          className="delete"
        >
          <MdDelete />
        </button>
        <button className="edit">
          <MdEdit />
        </button>
      </div>
      <div>
        <h2>{board.title}</h2>
        <p className="category">{board.category}</p>
      </div>
      <Link to={`/play/${board._id}`} className="play btn btn-reverse">
        Play
      </Link>
    </div>
  );
};

export default BoardItem;
