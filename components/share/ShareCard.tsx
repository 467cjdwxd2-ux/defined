"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, Instagram, Twitter } from "lucide-react";
import type { Definition, AestheticTheme } from "@/types";
import toast from "react-hot-toast";

interface ShareCardProps {
  definition: Definition;
  theme: AestheticTheme;
}

const THEME_CARD_STYLES: Record<
  AestheticTheme,
  { bg: string; text: string; accent: string; sub: string }
> = {
  minimal: { bg: "bg-white", text: "text-gray-900", accent: "text-brand-500", sub: "text-gray-400" },
  retro: { bg: "bg-amber-50", text: "text-amber-900", accent: "text-orange-600", sub: "text-amber-500" },
  y2k: { bg: "bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300", text: "text-white", accent: "text-yellow-300", sub: "text-white/70" },
  grunge: { bg: "bg-gray-950", text: "text-gray-100", accent: "text-red-400", sub: "text-gray-500" },
  "soft-life": { bg: "bg-gradient-to-br from-purple-50 to-pink-50", text: "text-purple-900", accent: "text-brand-500", sub: "text-purple-400" },
  cottagecore: { bg: "bg-gradient-to-br from-green-50 to-amber-50", text: "text-green-900", accent: "text-green-700", sub: "text-green-500" },
  "luxury-neutral": { bg: "bg-stone-50", text: "text-stone-900", accent: "text-amber-700", sub: "text-stone-400" },
  "chaotic-meme": { bg: "bg-black", text: "text-white", accent: "text-pink-400", sub: "text-gray-500" },
};

export default function ShareCard({ definition, theme }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"square" | "story">("square");

  const styles = THEME_CARD_STYLES[theme];

  async function handleDownload() {
    if (!cardRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = `defined-${definition.name.toLowerCase()}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Downloaded! Tag us @getdefined 🎉");
    } catch {
      toast.error("Download failed — try screenshotting it!");
    }
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}/define/${encodeURIComponent(definition.name.toLowerCase())}?id=${definition.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied to clipboard!");
  }

  const entries = definition.definitions.slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-semibold text-gray-700">Share card</h3>
        <div className="flex gap-1">
          {(["square", "story"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                format === f
                  ? "bg-brand-100 text-brand-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f === "square" ? "⬛ Square" : "📱 Story"}
            </button>
          ))}
        </div>
      </div>

      {/* The actual card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-100">
        <motion.div
          ref={cardRef}
          layout
          className={`${styles.bg} p-8 md:p-10 ${
            format === "story"
              ? "aspect-[9/16] flex flex-col justify-center"
              : "aspect-square flex flex-col justify-center"
          }`}
        >
          {/* Decorative top stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-chaos-pink to-brand-600" />

          <div className="flex-1 flex flex-col justify-center">
            {/* Header */}
            <div className="mb-6">
              <p className={`text-xs font-bold uppercase tracking-widest ${styles.sub} mb-1 font-mono-custom`}>
                defined.app
              </p>
              <h2 className={`text-5xl md:text-6xl font-black font-display ${styles.text} leading-none mb-1`}>
                {definition.name}
              </h2>
              <p className={`text-sm italic ${styles.accent} font-display`}>
                {definition.partOfSpeech}
              </p>
            </div>

            <hr className={`border-current opacity-10 mb-6`} />

            {/* Definitions */}
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.number} className="flex gap-3">
                  <span className={`${styles.sub} font-mono-custom text-sm shrink-0 mt-0.5`}>
                    {entry.number}.
                  </span>
                  <p className={`${styles.text} opacity-85 text-sm leading-relaxed font-display italic`}>
                    {entry.emoji && <span className="not-italic mr-1">{entry.emoji}</span>}
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Watermark */}
          <div className="mt-8 flex items-center justify-between">
            <p className={`text-xs ${styles.sub}`}>
              Too accurate to be legal.
            </p>
            <p className={`text-xs font-bold ${styles.accent}`}>
              defined.app
            </p>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={handleDownload} className="btn-primary text-sm px-5 py-2.5">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button onClick={handleCopyLink} className="btn-secondary text-sm px-5 py-2.5">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${definition.name}" has been officially defined and it's too accurate 💀 ${window?.location?.href || ""}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm border border-gray-200"
        >
          <Twitter className="w-4 h-4" />
          Tweet it
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center">
        📸 Post and tag @getdefined — we repost the best ones
      </p>
    </div>
  );
}
