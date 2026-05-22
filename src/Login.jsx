import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const Loginlogics = (loginDetails) => {
    // Get all registered users
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    // If no users registered
    if (registeredUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No User Found",
        text: "Please register first!",
        confirmButtonText: "Go to Register",
      }).then(() => {
        navigate("/register");
      });

      return;
    }

    // Check valid user
    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginDetails.email &&
        user.password === loginDetails.password,
    );

    // Login success
    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Back!",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();

      setTimeout(() => {
        navigate("/home");

        // Optional refresh
        window.location.reload();
      }, 1500);
    }

    // Invalid login
    else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        confirmButtonText: "Register Now",
      }).then(() => {
        navigate("/register");
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(Loginlogics)}>
          {/* EMAIL */}

          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          {/* BUTTON */}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
