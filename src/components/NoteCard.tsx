import React, { useCallback } from "react";
import type { Note } from "../types";

interface NoteCardProps {
  note: Note;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = React.memo(
  ({ note, onClick, onDelete }) => {
    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Delete this note?")) onDelete(note.id);
      },
      [note.id, onDelete]
    );

    const plainText = note.content.replace(/<[^>]*>/g, "").substring(0, 100);
    const date = new Date(note.updatedAt).toLocaleDateString();

    return (
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer border relative">
        <div className="absolute top-2 right-2 mb-2">
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600 text-x font-bold"
          >
            ✕
          </button>
        </div>
        <div onClick={() => onClick(note.id)}>
          <h3 className="font-bold text-lg truncate mb-2">{note.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plainText}</p>
          <div className="flex gap-2 mb-2 flex-wrap">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {note.category}
            </span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }
);

NoteCard.displayName = "NoteCard";
