"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ChevronDown } from "lucide-react";
import type { GeneratorInput, Tone, RelationshipType } from "@/types";
import { TONE_LABELS, TONE_EMOJIS, RELATIONSHIP_LABELS } from "@/types";
import ToneSelector from "./ToneSelector";

interface GeneratorFormProps {
  onGenerate: (definitions: any[]) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const relationships: RelationshipType[] = [
  "dog", "cat", "horse", "best-friend", "boyfriend", "girlfriend",
  "husband", "wife", "mom", "dad", "coworker", "child", "yourself",
];

const placeholdersByRelationship: Partial<Record<RelationshipType, string>> = {
  dog: "chaotic, zooms at 3am, eats socks, thinks he's a lap dog at 70 lbs",
  cat: "mysterious, judges everyone, knocks things off tables for fun",
  "best-friend": "chaotic supportive, texts back immediately only when it's funny",
  boyfriend: "confident, accidentally emotional, terrible at saying sorry",
  mom: "loves you, has opinions, texts in all caps",
  yourself: "delusionally optimistic, thriving in chaos, somehow functional",
};

export default function GeneratorForm({
  onGenerate,
  isLoading,
  setIsLoading,
}: GeneratorFormProps) {
  const [input, setInput] = useState<GeneratorInput>({
    name: "",
    relationship: "best-friend",
    traits: "",
    memories: "",
    tone: "chaotic",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.name.trim()) {
      setError("Add a name first — can't define nobody.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      onGenerate(data.definitions);
    } catch (err: any) {
      setError(err.message || "Failed to generate. Try again?");
    } finally {
      setIsLoading(false);
    }
  }

  const traitsPlaceholder =
    placeholdersByRelationship[input.relationship] ||
    "describe them in 5-10 words — the more specific the better";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            placeholder="Natalie, Biscuit, Marcus, Luna..."
            className="input-field text-lg font-display"
            maxLength={50}
            required
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Who is this?
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {relationships.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => setInput({ ...input, relationship: rel })}
                className={`px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all duration-200 ${
                  input.relationship === rel
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-gray-100 bg-white text-gray-600 hover:border-gray-200"
                }`}
              >
                {RELATIONSHIP_LABELS[rel]}
              </button>
            ))}
          </div>
        </div>

        {/* Traits */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Describe them{" "}
            <span className="text-gray-400 font-normal">(be specific)</span>
          </label>
          <textarea
            value={input.traits}
            onChange={(e) => setInput({ ...input, traits: e.target.value })}
            placeholder={traitsPlaceholder}
            className="input-field resize-none h-24 text-sm"
            maxLength={300}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {input.traits.length}/300 · the more detail, the more accurate the
            devastation
          </p>
        </div>

        {/* Tone selector */}
        <ToneSelector
          selected={input.tone}
          onChange={(tone) => setInput({ ...input, tone })}
        />

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
          />
          {showAdvanced ? "Hide" : "Add"} inside jokes & memories
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Inside jokes / memories{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={input.memories}
              onChange={(e) => setInput({ ...input, memories: e.target.value })}
              placeholder="e.g., always late, obsessed with a specific band, has a chaotic morning routine, infamous for the 2022 camping incident..."
              className="input-field resize-none h-20 text-sm"
              maxLength={200}
            />
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl"
          >
            {error}
          </motion.p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !input.name.trim()}
          className="w-full btn-primary text-lg py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating the truth...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Expose {input.name || "them"}
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Generating 3 variations · Takes about 10 seconds · Worth it
        </p>
      </form>
    </motion.div>
  );
}
