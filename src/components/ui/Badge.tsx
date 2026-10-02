import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "red" | "gray";
}

export function Badge({ children, variant = "gray" }: BadgeProps) {
  const variants = {
    green: "bg-teal-50 text-teal-600 border border-teal-100",
    red: "bg-red-50 text-red-500 border border-red-100",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
  };

  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
}
