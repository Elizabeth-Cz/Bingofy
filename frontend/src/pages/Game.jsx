import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard/GameBoard';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, reset } from '../features/boards/boardSlice';
import Spinner from '../components/Spinner/Spinner';

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { boards, isError, message, isLoading } = useSelector(
    (state) => state.boards
  );
  const [boardData, setBoardData] = useState();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBoard(id));

    if (isError) {
      console.log(message);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, user, id, navigate]);

  if (isError) return <div>{message}</div>;

  if (isLoading || boards.length === 0 || boards === []) return <Spinner />;

  return <GameBoard board={boards} />;
};

export default Game;
