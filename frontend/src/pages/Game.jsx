import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import GameBoard from '../components/GameBoard/GameBoard';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard } from '../features/boards/boardSlice';
import Spinner from '../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { boards, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.boards
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getBoard(id));

    if (isError) {
      console.log(message);
      return;
    }
  }, [dispatch, isError, message, id, navigate]);

  if (isError) return <div>{message}</div>;

  if (isLoading || boards.length === 0 || boards === []) return <Spinner />;

  return (
    <div className="content">
      <Link className="back" to="/browse">
        <MdOutlineArrowBack size={'1rem'} /> Browse
      </Link>
      <GameBoard board={isSuccess && boards} />
    </div>
  );
};

export default Game;
