import './BoardItem.css';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();

  return (
    <div className="board-item">
      {/* <div>{new Date(board.createdAt).toLocaleString('en-GB')}</div> */}
      <h2>{board.title}</h2>
      <p className="category">{board.category}</p>
      <button
        onClick={() => {
          dispatch(deleteBoard(board._id));
          localStorage.removeItem('board ' + board._id);
        }}
        className="close"
      >
        <TiDelete />
      </button>
      <Link to={`/play/${board._id}`} className="btn btn-reverse">
        Play
      </Link>
    </div>
  );
};

export default BoardItem;
