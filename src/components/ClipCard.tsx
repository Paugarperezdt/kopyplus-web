"use client";
import { Clip } from "@/types/clip";
import { toast } from "sonner";
import { deleteClip } from "@/lib/storage";
import { ClipboardCopy, Trash2 } from "lucide-react";

export default function ClipCard({ clip, onChange }: { clip: Clip; onChange: () => void }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(clip.text);
      toast.success("Copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  const remove = () => {
    deleteClip(clip.id);
    toast.info("Clip eliminado");
    onChange();
  };

  const date = new Date(clip.createdAt).toLocaleString();

  return (
    <article className="rounded-xl border p-4 shadow-sm transition hover:shadow">
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{clip.text}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <span>{date}</span>
        <div className="flex gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            aria-label="Copiar"
            title="Copiar"
          >
            <ClipboardCopy size={14} />
            Copiar
          </button>
          <button
            onClick={remove}
            className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            aria-label="Eliminar"
            title="Eliminar"
          >
            <Trash2 size={14} />
            Borrar
          </button>
        </div>
      </div>
    </article>
  );
}
