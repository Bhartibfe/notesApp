import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, deleteNote, setNotes } from "../store/notesSlice";
import type { RootState } from "../store/store";
import type { Note } from "../types";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { NoteCard } from "../components/NoteCard";
import { NoteEditor } from "../components/NoteEditor";

export const NotesPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const search = useSelector((state: RootState) => state.notes.search);
  const category = useSelector((state: RootState) => state.notes.category);
  const sortBy = useSelector((state: RootState) => state.notes.sortBy);
  const viewMode = useSelector((state: RootState) => state.notes.viewMode);

  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [showEditor, setShowEditor] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`notes_${user.id}`);
    if (saved && notes.length === 0) {
      dispatch(setNotes(JSON.parse(saved)));
    }
  }, [user, dispatch, notes.length]);

  // Save note to localStorage
  const saveToStorage = (note: Note) => {
    if (!user?.id) return;
    const key = `notes_${user.id}`;
    const all = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)!)
      : [];
    const idx = all.findIndex((n: Note) => n.id === note.id);
    if (idx >= 0) all[idx] = note;
    else all.push(note);
    localStorage.setItem(key, JSON.stringify(all));
  };

  // Filter and sort notes
  const filtered = useMemo(() => {
    let result = notes.filter((n) => {
      const match =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase());
      const cat = category === "All" || n.category === category;
      return match && cat;
    });
    result.sort((a, b) =>
      sortBy === "title"
        ? a.title.localeCompare(b.title)
        : new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
    );
    return result;
  }, [notes, search, category, sortBy]);

  // Save note
  const handleSave = (data: Partial<Note>) => {
    if (editingNote) {
      const updated = {
        ...editingNote,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      dispatch(updateNote(updated));
      saveToStorage(updated);
    } else {
      const newNote: Note = {
        id: `note_${Date.now()}`,
        userId: user?.id || "",
        title: data.title || "",
        content: data.content || "",
        tags: data.tags || [],
        category: data.category || "Personal",
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addNote(newNote));
      saveToStorage(newNote);
    }
    setShowEditor(false);
    setEditingNote(undefined);
  };

  // Delete note
  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
    if (user?.id) {
      const key = `notes_${user.id}`;
      const all = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key)!)
        : [];
      localStorage.setItem(
        key,
        JSON.stringify(all.filter((n: Note) => n.id !== id))
      );
    }
  };

  // Favorite toggle
  const handleFavorite = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      const updated = { ...note, isFavorite: !note.isFavorite };
      dispatch(updateNote(updated));
      saveToStorage(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNewNote={() => {
          setEditingNote(undefined);
          setShowEditor(true);
        }}
      />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No notes</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onClick={(id) => {
                    setEditingNote(notes.find((n) => n.id === id));
                    setShowEditor(true);
                  }}
                  onDelete={handleDelete}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSave}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </div>
  );
};
