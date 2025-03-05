import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

// Component for rendering a single todo item
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, toggleImportant }) => {
  return (
    <div className="Todo">
      {/* Checkbox to toggle completion */}
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
      </div>

      {/* Display the task text */}
      <div className="task-text">
        <p className={`${task.completed ? 'completed' : ''}`}>
          {task.task}
        </p>
      </div>

      {/* Star icon to mark as important */}
      <div className="action-icons">
        <FontAwesomeIcon
          icon={faStar}
          onClick={() => toggleImportant(task.id)}
          style={{
            cursor: 'pointer',
            color: task.important ? '#FFD700' : '#fff'
          }}
        />
      </div>

      {/* Icon to trigger edit mode */}
      <div className="action-icons">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Icon to delete the todo */}
      <div className="action-icons">
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};
