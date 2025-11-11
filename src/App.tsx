import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreAuth } from "./store/authSlice";
import type { RootState } from "./store/store";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotesPage } from "./pages/NotesPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(restoreAuth({ user, token }));
      } catch (error) {
        console.log("Failed to restore auth");
      }
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/notes" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
