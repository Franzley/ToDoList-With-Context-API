//IMPORTS
import React from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Inputs from "./Inputs.js";

export const Home = () => {
  //Set Context
  const { store, actions } = useContext(Context);

  //Initialize States
  const [textEntered, setTextEntered] = useState("");

  //Update Input value
  function inputValue(e) {
    const itemValue = e.target.value;
    setTextEntered(itemValue);
  }

  //Add a new task
  function addNewTask(e) {
    e.preventDefault();
    actions.todoList(textEntered);
    setTextEntered("");
  }

  //Delete task by id value
  function deleteTask(id) {
    actions.deleteTask(id);
  }

  return (
    <div>
      <h1 className="todo-header">Todos</h1>
      <div className="todos-container d-flex flex-column">
        <div className="todos-container-header d-flex flex-row">
          <span className="me-3">Tasks</span>
          <form onSubmit={addNewTask}>
            <input
              type="text"
              onChange={inputValue}
              value={textEntered}
            />
          </form>
        </div>

        <div className="todos-container-body flex-grow-1">
          <ul>
            {store.list.map((task, index) => (
              <Inputs
                key={index}
                id={index}
                task={task}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </div>

        <div className="flex-grow-1">
          {store.list.length === 0
            ? "No tasks, add a task"
            : `Number of Tasks: ${store.list.length}`}
        </div>
      </div>
    </div>
  );
};
