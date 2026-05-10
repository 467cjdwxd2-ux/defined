"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const ROTATING_NAMES = [
  "Sarah",
  "your dog",
  "Marcus",
  "your mom",
  "Luna",
  "yourself",
  "Biscuit",
  "your coworker",
];

const EXAMPLE_SNIPPETS = [
  "survives entirely on caffeine, chaos, and emotionally devastating Spotify playlists",
  "somehow both the therapist friend AND the problem",
  "operates on two modes: zooming at 3am and existential napping",
  "believes lighting a candle will fix the situation",
  "statistically the most confident person in any room, regardless of qualifications",
];

export default function Hero() {
  const [nameIndex, setNameIndex] = useState(0);
  const [snippetIndex, setSnippetIndex] = useState(0);

  useEffect(() => {
    const nameInterval = setInterval(() => {
      setNameIndex((i) => (i + 1) % ROTATING_NAMES.length);
    }, 2000);
    return () => clearInterval(nameInterval);
  }, []);

  useEffect(() => {
    const snippetInterval = setInterval(() => {
      setSnippetIndex((i) => (i + 1) % EXAMPLE_SNIPPETS.length);
    }, 3500);
    return () => clearInterval(snippetInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-brand-100 blur-3xl opacity-60 animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-40 animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-fuchsia-50 blur-3xl opacity-30" />

        {/* Floating definition snippets */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-32 right-8 lg:right-24 hidden md:block max-w-xs bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 rotate-3"
        >
          <p className="text-xs text-gray-400 mb-1 font-mono-custom">noun · chaotic</p>
          <p className="text-sm font-display italic text-gray-700">
            "survives entirely on caffeine, chaos, and emotional support playlists"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-32 left-8 lg:left-24 hidden md:block max-w-xs bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 -rotate-2"
        >
          <p className="text-xs text-gray-400 mb-1 font-mono-custom">noun · pet goblin</p>
          <p className="text-sm font-display italic text-gray-700">
            "a 12-pound golden entity who has never experienced self-doubt"
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-8"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          AI-powered · instantly shareable · dangerously accurate
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[1.05] mb-6">
            Type a name.
            <br />
            <span className="gradient-text">Get a definition.</span>
            <br />
            <span className="text-gray-900">Send it to them.</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-4"
        >
          Turn your favorite humans and pets into iconic fake dictionary entries.
          Turn those entries into hoodies, mugs, and gifts they'll screenshot immediately.
        </motion.p>

        {/* Live rotating snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 h-8 overflow-hidden"
        >
          <motion.p
            key={snippetIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-gray-400 italic font-display"
          >
            "{EXAMPLE_SNIPPETS[snippetIndex]}"
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/generate"
            className="btn-primary text-base px-8 py-4 rounded-2xl animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5" />
            Define{" "}
            <motion.span
              key={nameIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block min-w-[80px] text-left"
            >
              {ROTATING_NAMES[nameIndex]}
            </motion.span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/chaotic-definitions"
            className="btn-secondary text-base px-8 py-4 rounded-2xl"
          >
            See Examples
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["🧑", "👩", "🧔", "👧", "🐶"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs border-2 border-white"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span>50,000+ definitions generated</span>
          </div>
          <span className="hidden sm:block text-gray-200">·</span>
          <div className="flex items-center gap-1">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="text-yellow-400 text-base">
                {s}
              </span>
            ))}
            <span className="ml-1">Embarrassingly accurate</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-200 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-brand-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
