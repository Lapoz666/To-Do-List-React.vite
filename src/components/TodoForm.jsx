import React, { useState } from 'react';

// Component for adding a new todo
export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  // Handle form submission to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();// Prevent page refresh
    if (value.trim() !== '') {
      addTodo(value);
      setValue('');
    }
  };
//setting value of each item
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        <b>ADD TASK</b>
      </button>
    </form>
  );
};
