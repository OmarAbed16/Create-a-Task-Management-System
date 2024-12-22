import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password || !passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Password and confirmation do not match!",
      });
      return;
    }

    registerUser({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
          text: "You have registered successfully.",
        });

        console.log(data);
        console.log("ff");
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);

        navigate("/dashboard");
        console.log("Registration success:", data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: "Something went wrong, please try again.",
        });
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
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
          <div className="form-group mt-2">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button
            onClick={handleRegister}
            className="btn btn-primary mt-3 w-100"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
