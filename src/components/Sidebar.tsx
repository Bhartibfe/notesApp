import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy, setViewMode } from "../store/notesSlice";
import type { RootState } from "../store/store";

const categories = ["All", "Work", "Personal", "Ideas", "Tasks"];
const sortOptions = [
  { value: "updatedAt", label: "Last Modified" },
  { value: "createdAt", label: "Date Created" },
  { value: "title", label: "Title (A-Z)" },
];

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.notes.category);
  const sortBy = useSelector((state: RootState) => state.notes.sortBy);
  const viewMode = useSelector((state: RootState) => state.notes.viewMode);

  const handleCategory = useCallback(
    (cat: string) => {
      dispatch(setCategory(cat));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (sort: any) => {
      dispatch(setSortBy(sort));
    },
    [dispatch]
  );

  const handleViewMode = useCallback(
    (mode: "list" | "grid") => {
      dispatch(setViewMode(mode));
    },
    [dispatch]
  );

  return (
    <aside className="w-64 bg-gray-100 p-6 border-r">
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">Categories</h3>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`block w-full text-left px-3 py-2 rounded mb-2 ${
              category === cat ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">View Mode</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleViewMode("list")}
            className={`flex-1 px-3 py-2 rounded ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            List
          </button>
          <button
            onClick={() => handleViewMode("grid")}
            className={`flex-1 px-3 py-2 rounded ${
              viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
        </div>
      </div>
    </aside>
  );
};
