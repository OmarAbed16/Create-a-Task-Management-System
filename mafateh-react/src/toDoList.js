import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import DataTable from "react-data-table-component"; // Import react-data-table-component
import "./App.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const userId = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")).id
    : null;

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/api/tasks/${userId}`)
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userId]);

  function handleInputChange(e, setter) {
    setter(e.target.value);
  }

  function addOrEditTask() {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === "" ||
      !userId
    )
      return;

    const newTaskData = {
      title,
      description,
      status,
      due_date: dueDate,
      user_id: userId, // Include user_id
    };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTaskData;
      setTasks(updatedTasks);
      setEditIndex(null);
      updateTaskAPI(newTaskData, tasks[editIndex].id);
    } else {
      setTasks([...tasks, newTaskData]);
      addTaskAPI(newTaskData);
    }

    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
  }

  function startEditTask(index) {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setStatus(tasks[index].status);
    setDueDate(tasks[index].due_date);
    setEditIndex(index);
  }

  function deleteTask(index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter((_, i) => index !== i);
        setTasks(updatedTasks);
        deleteTaskAPI(tasks[index].id);
        if (editIndex === index) {
          setEditIndex(null);
          setTitle("");
          setDescription("");
          setStatus("pending");
          setDueDate("");
        }
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  }

  function addTaskAPI(task) {
    fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => console.log("Task added:", data))
      .catch((error) => console.error("Error adding task:", error));
  }

  function updateTaskAPI(task, id) {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => console.log("Task updated:", data))
      .catch((error) => console.error("Error updating task:", error));
  }

  function deleteTaskAPI(id) {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log("Task deleted:", data))
      .catch((error) => console.error("Error deleting task:", error));
  }

  // DataTable columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <>
          <button className="edit-btn" onClick={() => startEditTask(index)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => deleteTask(index)}>
            X
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container1">
      <h1>To Do Application</h1>
      <input
        type="text"
        value={title}
        placeholder="Enter task title"
        onChange={(e) => handleInputChange(e, setTitle)}
      />
      <input
        type="text"
        value={description}
        placeholder="Enter task description"
        onChange={(e) => handleInputChange(e, setDescription)}
      />
      <select value={status} onChange={(e) => handleInputChange(e, setStatus)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => handleInputChange(e, setDueDate)}
      />
      <button onClick={addOrEditTask}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>

      <DataTable
        title="Tasks List"
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        searchable
      />
    </div>
  );
}

export default ToDoList;
