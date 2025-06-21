"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show a static placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-xl bg-muted/40 flex items-center justify-center border border-border/20 transition-all duration-500 ease-out">
        <Sun className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative w-11 h-11 rounded-xl bg-muted/40 hover:bg-accent/50 border border-border/20 hover:border-border/40 transition-all duration-500 ease-out flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Smooth background glow effect */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-90 group-hover:scale-100"></span>

      {/* Icons with very smooth transitions and glow */}
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-700 ease-out ${
            isDark
              ? "rotate-0 opacity-100 scale-100 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              : "rotate-180 opacity-0 scale-75"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-700 ease-out ${
            isDark
              ? "-rotate-180 opacity-0 scale-75"
              : "rotate-0 opacity-100 scale-100 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          }`}
        />
      </div>

      {/* Smooth ripple effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-primary/10 transition-all duration-300 ease-out scale-95 group-active:scale-100"></span>
    </button>
  );
}
