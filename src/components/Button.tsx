import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  disabled = false,
}) => {
  const baseStyles = "font-semibold rounded transition px-4 py-2";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        sizes[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};
