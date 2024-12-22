import React, { useEffect, useState } from "react";
import { fetchTasks } from "../api/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Tasks</h2>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.due_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
