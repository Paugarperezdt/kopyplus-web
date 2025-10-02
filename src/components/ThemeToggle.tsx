"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme === "dark") || (theme === "system" && resolvedTheme === "dark");

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm
                 border shadow-sm backdrop-blur
                 bg-white/80 border-zinc-200 hover:bg-white
                 text-zinc-700 hover:text-zinc-900
                 dark:bg-zinc-900/70 dark:border-zinc-700/60 dark:hover:bg-zinc-900
                 dark:text-zinc-200 dark:hover:text-white
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950
                 transition-colors"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
}

