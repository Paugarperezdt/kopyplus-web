"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"          // pone/quita "dark" en <html>
      enableSystem={false}       // NO seguir el sistema: manda el toggle
      defaultTheme="light"       // arranque
      storageKey="kopyplus-theme"// clave clara en localStorage
      disableTransitionOnChange  // sin parpadeos
    >
      {children}
    </NextThemesProvider>
  );
}
