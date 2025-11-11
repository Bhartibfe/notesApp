import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "search";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  label = "",
  required = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        required={required}
      />
    </div>
  );
};
