import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

// Main component that manages the todo list with local storage
export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(1); // Simple counter for generating unique IDs

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
    if (savedTodos.length > 0) {
      // Set counter to one more than the highest saved ID
      const maxId = Math.max(...savedTodos.map(todo => todo.id));
      setCounter(maxId + 1);
    }
  }, []);

  // Add a new todo using the current counter value as ID
  const addTodo = (todo) => {
    const newTodo = {
      id: counter, // Generate a unique id from the counter
      task: todo,
      completed: false,
      isEditing: false,
      important: false // New property for marking importance
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setCounter(counter + 1); // Increment counter for next todo
  };

  // Toggle completion status of a todo
  const toggleComplete = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // Toggle the important flag for a todo
  const toggleImportant = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // Delete a todo by id
  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // Toggle editing mode for a todo
  const editTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Update the task text and exit edit mode
  const editTask = (task, id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // Sort todos so that important ones appear first (while preserving order among each group)
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.important === b.important) return 0;
    return a.important ? -1 : 1;
  });

  return (
    <div className="TodoWrapper">
      <h1 style={{fontFamily:'serif'}}>GET THINGS DONE !</h1>
      <TodoForm addTodo={addTodo} />

      {/* Render each todo item */}
      {sortedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            toggleImportant={toggleImportant} // pass toggleImportant function
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
