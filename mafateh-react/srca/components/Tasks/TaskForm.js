import React, { useState } from "react";
import { createTask } from "../api/api";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    createTask({ title, description, status, due_date: dueDate })
      .then((data) => {
        console.log("Task created:", data);
      })
      .catch((error) => console.error("Error creating task:", error));
  };

  return (
    <div className="container mt-5">
      <h2>Create a Task</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary mt-3">
        Create Task
      </button>
    </div>
  );
};

export default TaskForm;
