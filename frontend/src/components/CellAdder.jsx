import { useRef, useState } from 'react';

import { MdAdd } from 'react-icons/md';

const CellAdder = ({ boardData, setBoardData, children }) => {
  const [cell, setCell] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setCell(event.target.value);
  };

  const addCell = (event) => {
    event.preventDefault();
    if (cell !== '') {
      setBoardData({
        ...boardData,
        cells: [...boardData.cells, cell],
      });
    }
    setCell('');
    inputRef.current.focus();
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="cell">Board cells</label>
        <div className="add-input">
          <input
            type="text"
            name="cell"
            id="cell"
            value={cell}
            onChange={handleChange}
            ref={inputRef}
          />
          {/* FIXME: have input and button on same line */}
          {boardData.cells.length < 25 && (
            <button className="btn btn-reverse add" onClick={addCell}>
              <MdAdd />
            </button>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default CellAdder;
