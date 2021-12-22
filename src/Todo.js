import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <span>{todo.name}</span>
      <input
        type="checkbox"
        onChange={handleTodoClick}
        checked={todo.completed}
      />
    </div>
  );
}
