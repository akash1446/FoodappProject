import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");

  const registerLogics = (userData) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === userData.email);

    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This email is already registered!",
      });
      return;
    }

    const { confirmPassword, ...newUser } = userData;

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Your data has been safely stored.",
    }).then(() => {
      // ✅ FIXED ROUTE (IMPORTANT)
      navigate("/");
    });

    reset();
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1 className="register-title">
          FOODIE<span>ZONE</span>
        </h1>

        <p className="register-subtitle">
          Create your account to get started 🚀
        </p>

        <form className="register-form" onSubmit={handleSubmit(registerLogics)}>
          {/* NAME */}
          <label className="register-label">Full Name</label>
          <div className="input-box">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Enter Full Name"
              className={`register-input ${errors.name ? "input-error" : ""}`}
              {...register("name", {
                required: "Full name is required",
              })}
            />
          </div>
          {errors.name && (
            <span className="error-msg">{errors.name.message}</span>
          )}

          {/* EMAIL */}
          <label className="register-label">Email Address</label>
          <div className="input-box">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              placeholder="Enter Email"
              className={`register-input ${errors.email ? "input-error" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="error-msg">{errors.email.message}</span>
          )}

          {/* PHONE */}
          <label className="register-label">Phone Number</label>
          <div className="input-box">
            <span className="input-icon">📞</span>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className={`register-input ${errors.phone ? "input-error" : ""}`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
            />
          </div>
          {errors.phone && (
            <span className="error-msg">{errors.phone.message}</span>
          )}

          {/* PASSWORD */}
          <label className="register-label">Password</label>
          <div className="input-box">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Enter Password"
              className={`register-input ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="error-msg">{errors.password.message}</span>
          )}

          {/* CONFIRM PASSWORD */}
          <label className="register-label">Confirm Password</label>
          <div className="input-box">
            <span className="input-icon">🛡️</span>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`register-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error-msg">{errors.confirmPassword.message}</span>
          )}

          {/* BUTTON */}
          <button type="submit" className="register-btn">
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="login-redirect-text">
            Already have an account?
            <Link to="/" className="login-redirect-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
