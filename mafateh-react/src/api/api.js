const API_URL = "http://127.0.0.1:8000/api/";

export const registerUser = (data) => {
  return fetch(`${API_URL}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error registering:", error));
};

export const loginUser = (data) => {
  return fetch(`${API_URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error logging in:", error));
};

export const fetchTasks = () => {
  return fetch(`${API_URL}tasks`)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching tasks:", error));
};

export const createTask = (data) => {
  return fetch(`${API_URL}tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error creating task:", error));
};

export const updateTask = (id, data) => {
  return fetch(`${API_URL}tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error updating task:", error));
};

export const deleteTask = (id) => {
  return fetch(`${API_URL}tasks/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error deleting task:", error));
};
