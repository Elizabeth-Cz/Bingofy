import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardItem from '../components/BoardItem/BoardItem';
import { getPublicBoards } from '../features/boards/boardSlice';

const Browse = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { boards } = useSelector((state) => state.boards);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getPublicBoards());
  }, []);

  const filteredBoards = boards.filter((board) => {
    return board.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="content">
      <div className="form-group">
        <label htmlFor="search">Search boards by title</label>
        <input type="text" name="search" id="search" onChange={handleSearch} />
      </div>
      {filteredBoards.length > 0 &&
        filteredBoards.map((board) => (
          <BoardItem key={board._id} board={board} user={user} />
        ))}
    </div>
  );
};

export default Browse;
