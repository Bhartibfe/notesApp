import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../store/authSlice";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = useCallback(() => {
    if (!username || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.username === username)) {
      setError("Username already exists");
      return;
    }

    const newUser = { id: `user_${Date.now()}`, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const token = `token_${Date.now()}`;
    const user = { id: "user123", username: "john" };

    dispatch(register({ user, token }));

    // IMPORTANT: Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/notes");
  }, [username, password, confirmPassword, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Notes App</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose username"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
        />

        <Button onClick={handleRegister} className="w-full mb-4">
          Register
        </Button>

        <p className="text-center text-gray-600">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
