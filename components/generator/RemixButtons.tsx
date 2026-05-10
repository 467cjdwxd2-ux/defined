"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type RemixMode = "roast" | "sweeter" | "more-chaotic" | "devastating" | "pet-edition";

interface RemixButtonsProps {
  onRemix: (mode: RemixMode) => void;
  isLoading: boolean;
}

const remixOptions: { mode: RemixMode; label: string; emoji: string; color: string }[] = [
  { mode: "roast", label: "Roast mode", emoji: "🔥", color: "hover:bg-red-50 hover:border-red-200 hover:text-red-700" },
  { mode: "sweeter", label: "Make it sweeter", emoji: "🍯", color: "hover:bg-pink-50 hover:border-pink-200 hover:text-pink-700" },
  { mode: "more-chaotic", label: "More chaotic", emoji: "🌪️", color: "hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700" },
  { mode: "devastating", label: "Emotionally devastating", emoji: "😭", color: "hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700" },
  { mode: "pet-edition", label: "Pet edition", emoji: "🐾", color: "hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700" },
];

export default function RemixButtons({ onRemix, isLoading }: RemixButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {remixOptions.map(({ mode, label, emoji, color }) => (
        <motion.button
          key={mode}
          type="button"
          onClick={() => onRemix(mode)}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-gray-100 bg-white text-gray-600 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${color}`}
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <span>{emoji}</span>
          )}
          {label}
        </motion.button>
      ))}
    </div>
  );
}
