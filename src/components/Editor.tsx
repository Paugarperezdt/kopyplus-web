"use client";
import { useState } from "react";
import { addClip } from "@/lib/storage";
import { toast } from "sonner";

export default function Editor({ onCreated }: { onCreated: () => void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    const value = text.trim();
    if (!value) {
      toast.warning("Pega o escribe algo para crear el clip");
      return;
    }
    try {
      setLoading(true);
      addClip(value);
      setText("");
      toast.success("Clip guardado en tu dispositivo");
      onCreated();
    } catch {
      toast.error("No se pudo guardar el clip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pega aquí tu texto…"
        className="h-36 w-full resize-y rounded-xl border bg-white/70 p-3 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900/60"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-zinc-500">{text.length} caracteres</span>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white disabled:opacity-60"
          aria-label="Crear clip"
        >
          {loading ? "Guardando…" : "Crear clip"}
        </button>
      </div>
    </div>
  );
}
