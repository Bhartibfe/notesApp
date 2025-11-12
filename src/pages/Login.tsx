import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    const token = `token_${Date.now()}`;
    dispatch(login({ user: { id: user.id, username: user.username }, token }));
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ id: user.id, username: user.username })
    );
    navigate("/notes");
  }, [username, password, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Notes App</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
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

        <Button onClick={handleLogin} className="w-full mb-4">
          Login
        </Button>

        <p className="text-center text-gray-600">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
