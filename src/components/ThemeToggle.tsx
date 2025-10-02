"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? systemTheme : theme;
  if (!mounted) return null;

  return (
    <button
      aria-label="Cambiar tema"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
    >
      {current === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{current === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
