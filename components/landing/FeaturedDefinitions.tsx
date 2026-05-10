"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import { EXAMPLE_DEFINITIONS } from "@/lib/utils";
import { TONE_EMOJIS, TONE_LABELS } from "@/types";

const TONE_COLORS = {
  chaotic: "bg-orange-50 text-orange-700 border-orange-100",
  savage: "bg-red-50 text-red-700 border-red-100",
  wholesome: "bg-pink-50 text-pink-700 border-pink-100",
  romantic: "bg-rose-50 text-rose-700 border-rose-100",
  "pet-goblin": "bg-amber-50 text-amber-700 border-amber-100",
  "emotionally-unstable": "bg-purple-50 text-purple-700 border-purple-100",
  "main-character": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "soft-cozy": "bg-green-50 text-green-700 border-green-100",
  "delusional-confidence": "bg-yellow-50 text-yellow-700 border-yellow-100",
  "gremlin-energy": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
};

export default function FeaturedDefinitions() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Too accurate to be{" "}
            <span className="gradient-text">comfortable</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real definitions generated for real humans (and at least one
            absolute goblin of a dog).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {EXAMPLE_DEFINITIONS.map((def, i) => (
            <motion.div
              key={def.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="definition-card card-hover group relative overflow-hidden"
            >
              {/* Tone badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`tag border text-xs ${
                    TONE_COLORS[def.tone] || "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
                >
                  {TONE_EMOJIS[def.tone]} {TONE_LABELS[def.tone]}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100">
                  <Share2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Definition content */}
              <div className="dict-entry">
                <h3 className="text-3xl font-bold font-display mb-0.5">
                  {def.name}
                </h3>
                <p className="dict-pos text-sm mb-4">{def.partOfSpeech}</p>

                <div className="space-y-3">
                  {def.definitions.map((d) => (
                    <div key={d.number} className="flex gap-3">
                      <span className="text-gray-300 font-mono-custom text-sm mt-0.5 shrink-0">
                        {d.number}.
                      </span>
                      <p className="dict-definition text-base leading-snug">
                        {d.emoji && (
                          <span className="mr-1.5">{d.emoji}</span>
                        )}
                        {d.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/generate" className="btn-primary text-base px-8 py-4 rounded-2xl">
            <ArrowRight className="w-5 h-5" />
            Generate your own
          </Link>
        </div>
      </div>
    </section>
  );
}
