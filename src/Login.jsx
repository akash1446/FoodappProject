import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const Loginlogics = (loginDetails) => {
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginDetails.email &&
        user.password === loginDetails.password,
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

    
      navigate("/home");

      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(Loginlogics)}>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
