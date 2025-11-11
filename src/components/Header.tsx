import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { setSearch } from "../store/notesSlice";
import type { RootState } from "../store/store";
import { Button } from "./Button";

interface HeaderProps {
  onNewNote?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const search = useSelector((state: RootState) => state.notes.search);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [dispatch, navigate]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(e.target.value));
    },
    [dispatch]
  );

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">📝 Notes App</h1>

        <input
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 rounded w-64 text-black"
        />

        <div className="flex gap-4 items-center">
          {onNewNote && <Button onClick={onNewNote}>+ New Note</Button>}
          <span className="text-sm">{user?.username}</span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
