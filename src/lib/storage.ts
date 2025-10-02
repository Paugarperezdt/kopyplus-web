import { Clip } from "@/types/clip";

const CLIPS_KEY = "kopyplus.clips.v1";
const API_KEY = "kopyplus.apiKey";

const isBrowser = () => typeof window !== "undefined";

export function loadClips(): Clip[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(CLIPS_KEY);
    return raw ? (JSON.parse(raw) as Clip[]) : [];
  } catch {
    return [];
  }
}

export function saveClips(clips: Clip[]) {
  if (!isBrowser()) return;
  localStorage.setItem(CLIPS_KEY, JSON.stringify(clips));
}

export function addClip(text: string): Clip {
  const clip: Clip = {
    id: (globalThis.crypto?.randomUUID?.() ?? Date.now().toString()) as string,
    text: text.trim(),
    createdAt: Date.now(),
  };
  const current = loadClips();
  saveClips([clip, ...current]);
  return clip;
}

export function deleteClip(id: string) {
  const next = loadClips().filter((c) => c.id !== id);
  saveClips(next);
}

export function setApiKey(value: string) {
  if (!isBrowser()) return;
  localStorage.setItem(API_KEY, value);
}

export function getApiKey(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(API_KEY);
}
