import React, { useReducer, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { Dialog } from "./dialog";

export const todoReducer = (state, action) => {
  switch(action.type){
    case "ADD":
      return [
        ...state, 
        {
          id: Date.now(),
          title: action.title,
        },
      ];
    case "REMOVE":
      return state.filter((todo) => {
        return todo.id !== action.id; 
      });
    case "DPDATE":
      return state.map((todo) => {
        if(todo.id === action.id){
          return{
            ...todo,
            title: action.title,
          };
        }
      })
    default:
      return state;
  }
};

export default function App() {
  const inputRef = useRef(null);
  const [id, setId] = useState(null);
  const [todos, dispatch] = useReducer(todoReducer, []);
  const handleAddTodo = () => {
    const title = inputRef.current.value;
    inputRef.current.value = "";
    dispatch({ type: "ADD", title });
  };
  const handleRemoveTodo = (id) => () => {
    dispatch({ type: "REMOVE", id });
  };
  const handleEditTodo = (id) => () => {
    setId(id);
  };
  const handleCloseDialog = () => {
    setId(null);
  };
  const handleUpdateTodo = (title) => {
    dispatch({ type: "UPDATE", id, title });
  };
  const currentTodo = todos.find((todo) => todo.id === id);

  return (
    <div>
      <div className="todo-header"></div>
      <div className="todo-container">
        <div className="todo-input-wrap">
          <input className="todo-input" ref={inputRef} type="text" />
          <button className="todo-add-btn" onClick={handleAddTodo}>
            +
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <div className="todo-list__btn">
                <button
                  className="todo-remove"
                  onClick={handleRemoveTodo(todo.id)}
                >
                  削除
                </button>
                <button className="todo-edit" onClick={handleEditTodo(todo.id)}>
                  編集
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!!currentTodo && (
        <Dialog
          defaultTitle={currentTodo.title}
          onClose={handleCloseDialog}
          onUpdate={handleUpdateTodo}
        />
      )}
    </div>
  );
}

export const root = createRoot(document.getElementById("root"));

root.render(<App />);
