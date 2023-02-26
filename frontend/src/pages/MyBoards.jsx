import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BoardItem from '../components/BoardItem/BoardItem';
import Spinner from '../components/Spinner/Spinner';
import { getBoards } from '../features/boards/boardSlice';

// FIXME: fix access to my boards

const MyBoards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  const handleAdd = () => {
    navigate('/create');
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getBoards());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="content">
      <h1>
        Your <span className="logo">Bingofy</span> Boards
      </h1>
      <button className="btn btn-reverse" onClick={handleAdd}>
        Add new board +
      </button>
      {/* <h3>Add New Board</h3> */}
      {boards && boards.length > 0 ? (
        <div className="boards-list">
          {boards.map((board) => (
            <BoardItem key={board._id} board={board} />
          ))}
        </div>
      ) : (
        <h3>You have not set any boards</h3>
      )}
    </section>
  );
};

export default MyBoards;
