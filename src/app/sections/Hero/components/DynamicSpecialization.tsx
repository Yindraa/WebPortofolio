"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { specializations } from "../data";

const DynamicSpecialization: React.FC = () => {
  const [currentSpecialization, setCurrentSpecialization] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentSpecialization((prev) => (prev + 1) % specializations.length);
        setIsTyping(true);
      }, 500); // Waktu jeda sebelum teks baru muncul
    }, 4000); // Durasi setiap teks ditampilkan
    return () => clearInterval(interval);
  }, []);

  const currentSpec = specializations[currentSpecialization];
  const CurrentIcon = currentSpec.icon;

  return (
    <div className="h-20 flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`p-2.5 rounded-xl bg-gradient-to-r ${
            currentSpec.color
          } shadow-lg transition-all duration-700 ease-out hover:scale-110 ${
            isTyping ? "scale-100 opacity-100" : "scale-90 opacity-70"
          }`}
        >
          <CurrentIcon className="w-5 h-5 text-white" />
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">
          <span
            className={`bg-gradient-to-r ${
              currentSpec.color
            } bg-clip-text text-transparent transition-all duration-700 ease-out ${
              isTyping ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {currentSpec.text}
          </span>
        </div>
      </div>
      <p
        className={`text-sm md:text-base text-muted-foreground transition-all duration-700 ease-out ${
          isTyping ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {currentSpec.description}
      </p>
    </div>
  );
};

export default DynamicSpecialization;
