import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getBoards, reset } from '../features/boards/boardSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import BoardItem from '../components/BoardItem/BoardItem';
// import GameBoard from '../components/GameBoard';

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getBoards());

    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="content">
      {boards && boards.map((board) => <BoardItem board={board} />)}
    </div>
  );
};

export default Play;
