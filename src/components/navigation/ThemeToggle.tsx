"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

/** Toggles the document theme and persists the choice. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className={
        "flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-surface-2 hover:text-text-primary " +
        (className ?? "")
      }
    >
      {/* Render nothing until mounted to avoid a hydration mismatch */}
      {theme === "light" ? (
        <Moon className="h-[18px] w-[18px]" />
      ) : theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
