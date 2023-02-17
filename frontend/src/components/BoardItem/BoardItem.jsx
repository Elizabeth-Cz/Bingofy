import './BoardItem.css';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../../features/boards/boardSlice';
import { Link } from 'react-router-dom';
// import { AiFillEdit } from 'react-icons/ai';

const BoardItem = ({ board }) => {
  const dispatch = useDispatch();

  return (
    <div className="board">
      {/* <div>{new Date(board.createdAt).toLocaleString('en-GB')}</div> */}
      <div>
        <h2>{board.title}</h2>
        <p className="category">{board.category}</p>
      </div>
      <button
        onClick={() => {
          dispatch(deleteBoard(board._id));
          localStorage.removeItem('board ' + board._id);
        }}
        className="close"
      >
        x
      </button>
      <Link to={`/play/${board._id}`} className="btn">
        Play
      </Link>
    </div>
  );
};

export default BoardItem;
