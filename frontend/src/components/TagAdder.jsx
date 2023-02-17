import { useState } from 'react';

const TagAdder = ({ boardData, setBoardData }) => {
  const [tag, setTag] = useState('');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  const addTag = (event) => {
    event.preventDefault();
    if (tag !== '') {
      setBoardData({
        ...boardData,
        tags: [...boardData.tags, tag],
      });
    }
    setTag('');
  };

  return (
    <div className="form-group">
      <label htmlFor="tag">Board Tags</label>
      <div className="add-field">
        <input
          type="text"
          name="tag"
          id="tag"
          value={tag}
          onChange={handleChange}
        />
        <button className="btn" onClick={addTag}>
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagAdder;
