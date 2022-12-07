import { CheckCircle, Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";

export const Todo = ({ todo, toggleComplete, handleDelete, handleEdit }) => {
  const [newTitle, setNewTitle] = useState(todo.Subject);

  const handleChange = (e) => {
    e.preventDefault();

    if (todo.complete === true) {
      setNewTitle(todo.Subject);
    } else {
      todo.Subject = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div>
      <input
        style={{ textDecoration: todo.completed && "line-through" }}
        type="text"
        value={todo.Subject === "" ? newTitle : todo.Subject}
        className="list"
        onChange={handleChange}
      />
      <div>
        <button onClick={() => toggleComplete(todo)}>
          <CheckCircle />
        </button>
        <button onClick={() => handleEdit(todo, newTitle)}>
          <Edit />
        </button>
        <button onClick={() => handleDelete(todo.id)}>
          <Delete />
        </button>
      </div>
    </div>
  );
};
