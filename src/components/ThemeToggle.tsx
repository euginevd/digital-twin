"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("site-theme") as Theme | null;
      if (stored === "dark" || stored === "light") setTheme(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("site-theme", theme); } catch {}
  }, [theme]);

  return (
    <div className="ds-theme-toggle" role="group" aria-label="Theme">
      <button onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}>
        Dark
      </button>
      <button onClick={() => setTheme("light")} aria-pressed={theme === "light"}>
        Light
      </button>
    </div>
  );
}
