import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const TipTapEditor: React.FC<EditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: content || "<p></p>",
    immediatelyRender: false, // FIX: Prevents rendering issues
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <div className="p-4 text-gray-500">Loading...</div>;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url && editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="border rounded bg-white">
      {/* Toolbar */}
      <div className="flex gap-1 p-2 bg-gray-100 border-b flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          S
        </button>

        <div className="border-l border-gray-300 mx-1"></div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          H2
        </button>

        <div className="border-l border-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bulletList")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          •
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("orderedList")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          1.
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("codeBlock") ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Code
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("blockquote")
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          Quote
        </button>

        <div className="border-l border-gray-300 mx-1"></div>

        <button
          onClick={addLink}
          className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-200"
        >
          Link
        </button>

        <div className="border-l border-gray-300 mx-1 ml-auto"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-200"
        >
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-200"
        >
          Redo
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-96 prose prose-sm max-w-none"
      />
    </div>
  );
};
