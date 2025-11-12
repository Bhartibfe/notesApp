import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy } from "../store/notesSlice";
import type { RootState } from "../store/store";

const categories = [
  { name: "All", icon: "M4 6h16M4 12h16M4 18h16" },
  {
    name: "Work",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    name: "Personal",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    name: "Ideas",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    name: "Tasks",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
];

const sortOptions: {
  value: "createdAt" | "updatedAt" | "title";
  label: string;
  icon: string;
}[] = [
  { value: "updatedAt", label: "Last Modified", icon: "..." },
  { value: "createdAt", label: "Date Created", icon: "..." },
  { value: "title", label: "Title (A-Z)", icon: "..." },
];

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.notes.category);
  const sortBy = useSelector((state: RootState) => state.notes.sortBy);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => dispatch(setCategory(cat.name))}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  category === cat.name
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={cat.icon}
                  />
                </svg>
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Sort By
          </h3>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => dispatch(setSortBy(option.value))}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                  sortBy === option.value
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={option.icon}
                  />
                </svg>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
