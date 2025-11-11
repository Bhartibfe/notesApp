import React, { useState, useCallback } from "react";
import type { Note } from "../types";
import { TipTapEditor } from "./TipTapEditor";
import { Button } from "./Button";

interface EditorProps {
  note?: Note;
  onSave: (data: Partial<Note>) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<EditorProps> = ({
  note,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "Personal");
  const [tags, setTags] = useState(note?.tags.join(", ") || "");
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      alert("Please add a title");
      return;
    }

    setSaving(true);

    // Save after 300ms
    setTimeout(() => {
      onSave({
        title: title.trim(),
        content,
        category,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      });
      setSaving(false);
    }, 300);
  }, [title, content, category, tags, onSave]);

  const wordCount = content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter((w) => w).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{note ? "Edit" : "New"} Note</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !title.trim()}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Ideas</option>
                <option>Tasks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="separate, with, commas"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Editor */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Content
            </label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          {/* Stats */}
          <div className="text-sm text-gray-600">
            Words: {wordCount} | Chars: {content.replace(/<[^>]*>/g, "").length}
          </div>
        </div>
      </div>
    </div>
  );
};
