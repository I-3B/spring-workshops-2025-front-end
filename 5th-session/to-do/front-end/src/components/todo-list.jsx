import React, { useEffect, useState } from "react";
import { CategorySelect } from "./category-select";
export function TodoList() {
  const [newDescription, setNewDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [todos, setTodos] = useState([]);
  const fetchTodos = () => {
    fetch("http://localhost:3001/todos", { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((todos) => {
        const filteredTodos = todos.filter((todo) => {
          if (todo.category == category || category == "All") {
            return true;
          } else {
            return false;
          }
        });
        setTodos(filteredTodos);
      });
  };
  useEffect(() => {
    fetchTodos();
  }, [category]);
  return (
    <div className="todo-container">
      <h1>To-do List</h1>
      <div className="form">
        <input
          onChange={(event) => {
            setNewDescription(event.target.value);
          }}
        ></input>
        <CategorySelect
          onChange={(value) => {
            setCategory(value);
          }}
          value={category}
        />
        <button
          onClick={() => {
            fetch("http://localhost:3001/todos", {
              method: "POST",
              body: JSON.stringify({ description: newDescription, category: category }),
            }).then((response) => {
              if (response.ok) {
                fetchTodos();
              } else {
                alert("Something went wrong");
              }
            });
          }}
        >
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                onChange={() => {
                  const id = todo.id;
                  const completed = !todo.completed;
                  fetch("http://localhost:3001/todos/" + id, {
                    method: "PUT",
                    body: JSON.stringify({ completed: completed }),
                  }).then((response) => {
                    if (response.ok) {
                      fetchTodos();
                    } else {
                      alert("Something went wrong");
                    }
                  });
                }}
                checked={todo.completed}
              ></input>
              <span>
                {todo.description} ({todo.category})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
