"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder yang cocok dengan ukuran tombol
    return <div className="w-14 h-8 rounded-full bg-secondary" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      // Menambahkan animasi saat tombol ditekan
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer bg-secondary shadow-inner border border-border/50" // Menambahkan border untuk kontras
      aria-label="Toggle theme"
    >
      {/* Lingkaran yang bergerak dan berisi ikon */}
      <motion.div
        className="absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md"
        layout
        // Menyempurnakan animasi spring agar lebih natural
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        style={{
          left: resolvedTheme === "light" ? "4px" : "calc(100% - 28px)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "light" ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Sun size={14} className="text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Moon size={14} className="text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
