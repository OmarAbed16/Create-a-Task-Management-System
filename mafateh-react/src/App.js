import "./App.css";
import Header from "./header.js";
import ToDoList from "./toDoList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About.js";
import Contact from "./Contact.js";
import Login from "./Auth/Login.js";
import Signup from "./Auth/Register.js";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<ToDoList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
