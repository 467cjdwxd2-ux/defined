"use client";

import { motion } from "framer-motion";
import type { Tone } from "@/types";
import { TONE_LABELS, TONE_EMOJIS } from "@/types";

interface ToneSelectorProps {
  selected: Tone;
  onChange: (tone: Tone) => void;
}

const TONE_DESCRIPTIONS: Record<Tone, string> = {
  chaotic: "Barely holding it together energy",
  savage: "Loving but merciless roast",
  wholesome: "Sweet enough to screenshot",
  romantic: "Main character of a love story",
  "pet-goblin": "Absolute chaotic pet obsession",
  "emotionally-unstable": "Tumblr meets therapy journal",
  "main-character": "Dramatic, iconic, self-aware",
  "soft-cozy": "Cottagecore linen-shirt vibes",
  "delusional-confidence": "Never doubted themselves once",
  "gremlin-energy": "Feral, unfiltered, somehow relatable",
};

const TONE_GRADIENTS: Record<Tone, string> = {
  chaotic: "from-orange-400 to-red-500",
  savage: "from-red-500 to-rose-600",
  wholesome: "from-pink-400 to-rose-400",
  romantic: "from-rose-400 to-pink-500",
  "pet-goblin": "from-amber-400 to-orange-500",
  "emotionally-unstable": "from-purple-400 to-violet-500",
  "main-character": "from-cyan-400 to-blue-500",
  "soft-cozy": "from-green-400 to-emerald-500",
  "delusional-confidence": "from-yellow-400 to-amber-500",
  "gremlin-energy": "from-fuchsia-400 to-purple-500",
};

const tones: Tone[] = [
  "chaotic", "savage", "wholesome", "romantic", "pet-goblin",
  "emotionally-unstable", "main-character", "soft-cozy",
  "delusional-confidence", "gremlin-energy",
];

export default function ToneSelector({ selected, onChange }: ToneSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Tone / vibe
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {tones.map((tone) => (
          <motion.button
            key={tone}
            type="button"
            onClick={() => onChange(tone)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden ${
              selected === tone
                ? "border-transparent shadow-md"
                : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            {selected === tone && (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${TONE_GRADIENTS[tone]} opacity-10`}
              />
            )}
            <div
              className={`relative z-10 ${
                selected === tone ? "text-gray-900" : "text-gray-600"
              }`}
            >
              <div className="text-xl mb-1">{TONE_EMOJIS[tone]}</div>
              <div className="text-xs font-semibold leading-tight">
                {TONE_LABELS[tone]}
              </div>
            </div>
            {selected === tone && (
              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${TONE_GRADIENTS[tone]}`}
              />
            )}
          </motion.button>
        ))}
      </div>
      {selected && (
        <motion.p
          key={selected}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-500 mt-2 ml-1"
        >
          {TONE_EMOJIS[selected]} {TONE_DESCRIPTIONS[selected]}
        </motion.p>
      )}
    </div>
  );
}
