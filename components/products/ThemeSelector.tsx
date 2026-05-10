"use client";

import { motion } from "framer-motion";
import type { AestheticTheme } from "@/types";
import { THEME_LABELS } from "@/types";

interface ThemeSelectorProps {
  selected: AestheticTheme;
  onChange: (theme: AestheticTheme) => void;
}

const themes: { key: AestheticTheme; emoji: string; desc: string; preview: string }[] = [
  { key: "minimal", emoji: "◻️", desc: "Clean & modern", preview: "bg-white border-gray-200" },
  { key: "retro", emoji: "📻", desc: "Vintage vibes", preview: "bg-amber-50 border-amber-200" },
  { key: "y2k", emoji: "💿", desc: "2000s chaos", preview: "bg-pink-200 border-pink-300" },
  { key: "grunge", emoji: "🎸", desc: "Dark & edgy", preview: "bg-gray-900 border-gray-700" },
  { key: "soft-life", emoji: "🌸", desc: "Dreamy pastels", preview: "bg-purple-50 border-purple-100" },
  { key: "cottagecore", emoji: "🌿", desc: "Nature & cozy", preview: "bg-green-50 border-green-200" },
  { key: "luxury-neutral", emoji: "🤍", desc: "Premium & clean", preview: "bg-stone-50 border-stone-200" },
  { key: "chaotic-meme", emoji: "🔥", desc: "Pure chaos", preview: "bg-black border-gray-800" },
];

export default function ThemeSelector({ selected, onChange }: ThemeSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Choose aesthetic
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {themes.map(({ key, emoji, desc, preview }) => (
          <motion.button
            key={key}
            onClick={() => onChange(key)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`relative p-2 rounded-xl border-2 transition-all duration-200 text-center ${
              selected === key
                ? "border-brand-500 shadow-md"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            {/* Color preview swatch */}
            <div
              className={`w-full h-8 rounded-lg border mb-2 ${preview}`}
            />
            <div className="text-base leading-none mb-0.5">{emoji}</div>
            <p
              className={`text-xs font-semibold leading-tight ${
                selected === key ? "text-brand-700" : "text-gray-600"
              }`}
            >
              {THEME_LABELS[key]}
            </p>
          </motion.button>
        ))}
      </div>
      {selected && (
        <motion.p
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-400 mt-2"
        >
          {themes.find((t) => t.key === selected)?.emoji}{" "}
          {themes.find((t) => t.key === selected)?.desc}
        </motion.p>
      )}
    </div>
  );
}
