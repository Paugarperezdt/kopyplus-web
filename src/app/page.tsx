"use client";
import { useEffect, useState } from "react";
import Editor from "@/components/Editor";
import ClipCard from "@/components/ClipCard";
import { Clip } from "@/types/clip";
import { loadClips } from "@/lib/storage";

export default function Page() {
  const [clips, setClips] = useState<Clip[]>([]);

  // Recargar lista de clips
  const refresh = () => setClips(loadClips());

  useEffect(() => {
    refresh();
    // Escuchar cambios en localStorage (por si otro tab los modifica)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kopyplus.clips.v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main className="space-y-6">
      {/* Editor para crear clips */}
      <Editor onCreated={refresh} />

      {/* Listado de clips */}
      {clips.length === 0 ? (
        <p className="rounded-xl border p-4 text-sm text-zinc-500">
          Aún no tienes clips. Crea el primero pegando texto arriba.
        </p>
      ) : (
        <div className="grid gap-3">
          {clips.map((c) => (
            <ClipCard key={c.id} clip={c} onChange={refresh} />
          ))}
        </div>
      )}
    </main>
  );
}
