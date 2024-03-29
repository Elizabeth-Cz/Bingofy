import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardItem from '../components/BoardItem/BoardItem';
import Spinner from '../components/Spinner/Spinner';
import { getPublicBoards, reset } from '../features/boards/boardSlice';

const Browse = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading } = useSelector((state) => state.boards);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getPublicBoards());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const filteredBoards = Array.isArray(boards)
    ? boards.filter((board) => {
        return (
          board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          board.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  // const categories = boards.map((board) => board.category);
  // const uniqCategories = [...new Set(categories)];
  // console.log(uniqCategories);

  // const filterCategory = (value) => {
  //   return boards.category.toLowerCase().includes(value);
  // };

  if (isLoading) return <Spinner />;

  // TODO: improve search page by category
  // TODO: Search by category > dropdown menu with options derived
  // from board.category
  return (
    <div className="content">
      <div className="form-group">
        <label htmlFor="search">Search by title or category</label>
        <input type="text" name="search" id="search" onChange={handleSearch} />
      </div>
      {/* <div className="form-group">
        <label htmlFor="search">Search by category</label>
        <select name="categories" id="categories" onChange={filterCategory}>
          {uniqCategories.map((categ) => (
            <option value={categ}>{categ}</option>
          ))}
        </select>
      </div> */}
      {filteredBoards.length > 0 &&
        filteredBoards.map((board) => (
          <BoardItem key={board._id} board={board} user={user} />
        ))}
    </div>
  );
};

export default Browse;
