import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note, NotesState } from "../types";

const initialState: NotesState = {
  notes: [],
  search: "",
  category: "All",
  sortBy: "updatedAt",
  viewMode: "list",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) state.notes[index] = action.payload;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"createdAt" | "updatedAt" | "title">
    ) => {
      state.sortBy = action.payload;
    },
    //   setViewMode: (state, action: PayloadAction<"list" | "grid">) => {
    //     state.viewMode = action.payload;
    //   },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  setNotes,
  setSearch,
  setCategory,
  setSortBy,
} = notesSlice.actions;
export default notesSlice.reducer;
