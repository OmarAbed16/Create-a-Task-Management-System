import React, { useState } from "react";
import { loginUser } from "../api/api";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Both fields are required!",
      });
      return;
    }

    loginUser({ email, password })
      .then((data) => {
        if (data.token) {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem("token", data.token);

          Swal.fire({
            icon: "success",
            title: "Login successful!",
            text: "You are now logged in.",
          });

          console.log("Login success:", data);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid credentials. Please try again.",
        });
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary mt-3 w-100">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
