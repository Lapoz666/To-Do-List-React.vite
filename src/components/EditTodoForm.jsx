import React, { useState } from 'react';

// Component for editing an existing todo
export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  // Submit updated task text
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">
        <b>UPDATE TASK</b>
      </button>
    </form>
  );
};
