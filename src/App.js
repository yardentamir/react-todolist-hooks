import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"; // makes random IDs

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function HandleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    todoNameRef.current.value = null;
    setTodos((pervTodos) => {
      return [...pervTodos, { id: uuidv4(), name: name, completed: false }];
    });
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todos) => !todos.completed);
    setTodos(newTodos);
  }

  return (
    <div id="app">
      <div>
        <div className="head">
          <label className="input">
            <input
              className="input-field"
              ref={todoNameRef}
              type="text"
              placeholder=" "
            />
            <span className="input-label">Insert new todo</span>
          </label>
          <div className="buttons-wrapper">
            <button onClick={HandleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Completed</button>
          </div>
        </div>
        <div>{todos.filter((todo) => !todo.completed).length} left to do</div>
        <div className="todo-container">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
