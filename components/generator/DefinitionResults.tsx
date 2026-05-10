"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ShoppingBag, Zap, Sparkles } from "lucide-react";
import type { Definition } from "@/types";
import DefinitionCard from "./DefinitionCard";
import RemixButtons from "./RemixButtons";

interface DefinitionResultsProps {
  definitions: Definition[];
  onRegenerate: () => void;
  onSelectAndShop: (definition: Definition) => void;
  isLoading?: boolean;
}

export default function DefinitionResults({
  definitions,
  onRegenerate,
  onSelectAndShop,
  isLoading,
}: DefinitionResultsProps) {
  const [selectedId, setSelectedId] = useState<string>(
    definitions[0]?.id || ""
  );
  const [localDefinitions, setLocalDefinitions] =
    useState<Definition[]>(definitions);
  const [remixLoading, setRemixLoading] = useState(false);

  const selectedDefinition =
    localDefinitions.find((d) => d.id === selectedId) || localDefinitions[0];

  async function handleRemix(
    mode: "roast" | "sweeter" | "more-chaotic" | "devastating" | "pet-edition"
  ) {
    if (!selectedDefinition) return;
    setRemixLoading(true);
    try {
      const res = await fetch("/api/generate/remix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ definition: selectedDefinition, mode }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLocalDefinitions((prev) =>
        prev.map((d) => (d.id === selectedId ? data.definition : d))
      );
    } catch {
    } finally {
      setRemixLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold font-display">
            Here's the truth about{" "}
            <span className="gradient-text">{definitions[0]?.name}</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Pick the most accurate definition · then put it on a hoodie
          </p>
        </div>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="btn-ghost text-sm"
        >
          <RefreshCw
            className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
          />
          Regenerate
        </button>
      </motion.div>

      {/* Definition cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {localDefinitions.map((def, i) => (
            <DefinitionCard
              key={def.id}
              definition={def}
              isSelected={def.id === selectedId}
              onSelect={() => setSelectedId(def.id)}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Remix buttons */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-500" />
          Remix the selected definition
        </p>
        <RemixButtons
          onRemix={handleRemix}
          isLoading={remixLoading}
        />
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="sticky bottom-4 z-10"
      >
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-gray-900">
              Ready to put this on a hoodie?
            </p>
            <p className="text-sm text-gray-500">
              Select a version above, then choose your product
            </p>
          </div>
          <button
            onClick={() => selectedDefinition && onSelectAndShop(selectedDefinition)}
            disabled={!selectedDefinition}
            className="btn-primary whitespace-nowrap"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop this definition
          </button>
        </div>
      </motion.div>
    </div>
  );
}
