import React, { useState } from 'react';


const EditableTag = ({ tagName, onDataChange }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(tagName);

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
      onDataChange(newName);
    }
  };

  return (
    <div className="editable-tag">
      {editing ? (
        <input
          className="tag-input border border-gray-300 px-2 py-1 rounded"
          type="text"
          value={newName}
          onChange={handleInputChange}
          onBlur={() => {
            setEditing(false);
            onDataChange(newName);
          }}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span
          className="tag-name cursor-pointer font-semibold text-blue-500"
          onClick={handleStartEditing}
        >
          {newName}
        </span>
      )}
    </div>
  );
};

export default EditableTag;
