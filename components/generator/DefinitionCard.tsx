"use client";

import { motion } from "framer-motion";
import { Check, Share2, RefreshCw } from "lucide-react";
import type { Definition } from "@/types";
import { TONE_EMOJIS, TONE_LABELS } from "@/types";

interface DefinitionCardProps {
  definition: Definition;
  isSelected: boolean;
  onSelect: () => void;
  onShare?: () => void;
  index: number;
  variant?: "full" | "compact";
}

export default function DefinitionCard({
  definition,
  isSelected,
  onSelect,
  onShare,
  index,
  variant = "full",
}: DefinitionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 ${
        isSelected
          ? "border-brand-500 shadow-xl shadow-brand-500/10 bg-brand-50/30"
          : "border-gray-100 bg-white hover:border-brand-200 hover:shadow-lg"
      }`}
    >
      {/* Selection indicator */}
      <div
        className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? "border-brand-500 bg-brand-500"
            : "border-gray-200 bg-white"
        }`}
      >
        {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>

      {/* Variant badge */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs font-bold text-gray-400 font-mono-custom uppercase tracking-wider">
          Version {index + 1}
        </span>
        <span className="tag bg-gray-50 text-gray-500 border border-gray-100 text-xs">
          {TONE_EMOJIS[definition.tone]} {TONE_LABELS[definition.tone]}
        </span>
      </div>

      {/* Dictionary entry */}
      <div className="dict-entry space-y-1 mb-5">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h2 className="dict-name text-4xl md:text-5xl">{definition.name}</h2>
          {definition.pronunciation && (
            <span className="dict-pronunciation text-sm">
              {definition.pronunciation}
            </span>
          )}
        </div>
        <p className="dict-pos">{definition.partOfSpeech}</p>
        {definition.origin && variant === "full" && (
          <p className="text-xs text-gray-400 italic">
            origin: {definition.origin}
          </p>
        )}
      </div>

      <hr className="dict-divider mb-5" />

      {/* Definitions list */}
      <div className="space-y-4">
        {definition.definitions.map((entry) => (
          <div key={entry.number} className="flex gap-4">
            <span className="text-gray-300 font-mono-custom text-sm mt-1 shrink-0 font-bold">
              {entry.number}.
            </span>
            <div>
              <p className="dict-definition leading-snug">
                {entry.emoji && (
                  <span className="mr-2 text-xl">{entry.emoji}</span>
                )}
                {entry.text}
              </p>
              {entry.example && variant === "full" && (
                <p className="text-sm text-gray-400 italic mt-1.5">
                  e.g., "{entry.example}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      {isSelected && onShare && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-5 border-t border-brand-100 flex items-center gap-3"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share this definition
          </button>
        </motion.div>
      )}

      {/* Selected glow */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-2 ring-brand-500 ring-offset-0" />
      )}
    </motion.div>
  );
}
