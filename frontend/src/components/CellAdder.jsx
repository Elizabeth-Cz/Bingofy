import { useRef, useState } from 'react';

const CellAdder = ({ boardData, setBoardData }) => {
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
    // TODO: add focus on input
    setCell('');
    inputRef.current.focus();
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="cell">Board cells</label>
        <div className="add-field">
          <input
            type="text"
            name="cell"
            id="cell"
            value={cell}
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="btn" onClick={addCell}>
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CellAdder;
