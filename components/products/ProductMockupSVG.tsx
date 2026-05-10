"use client";

import Image from "next/image";
import type { Definition, AestheticTheme } from "@/types";

// Real product photos from Printify's catalog
const PRODUCT_PHOTOS: Record<string, string> = {
  hoodie:  "https://images.printify.com/66dad758afb86d1968036982",
  tshirt:  "https://images.printify.com/66d82988a65761e5f9096537",
  mug:     "https://images.printify.com/66c42e5361b2691da8085442",
  tote:    "https://images.printify.com/66dade985b5ac06ef50ad143",
  journal: "https://images.printify.com/66c4311e129915227500a332",
  sticker: "https://images.printify.com/66c5e3b718c4f0cee80b1e52",
};

const THEME_STYLES: Record<AestheticTheme, {
  bg: string; text: string; sub: string; accent: string; border: string; fontStyle: string;
}> = {
  minimal:          { bg: "rgba(255,255,255,0.96)", text: "#111111", sub: "#666666", accent: "#8338ec", border: "rgba(0,0,0,0.1)",    fontStyle: "Georgia, serif" },
  retro:            { bg: "rgba(245,230,211,0.96)", text: "#2D1B00", sub: "#8B5E3C", accent: "#E85D04", border: "rgba(139,94,60,0.3)", fontStyle: "Georgia, serif" },
  y2k:              { bg: "rgba(255,20,147,0.92)",  text: "#FFFFFF", sub: "#FFE4F0", accent: "#00FFFF", border: "rgba(0,255,255,0.5)", fontStyle: "'Arial Black', sans-serif" },
  grunge:           { bg: "rgba(15,15,15,0.95)",    text: "#E0E0E0", sub: "#888888", accent: "#FF4500", border: "rgba(255,69,0,0.3)",  fontStyle: "Georgia, serif" },
  "soft-life":      { bg: "rgba(253,240,255,0.96)", text: "#3B0764", sub: "#7C3AED", accent: "#C026D3", border: "rgba(192,38,211,0.2)",fontStyle: "Georgia, serif" },
  cottagecore:      { bg: "rgba(240,237,225,0.96)", text: "#2D4A1E", sub: "#6B8F52", accent: "#5A7A3A", border: "rgba(90,122,58,0.3)", fontStyle: "Georgia, serif" },
  "luxury-neutral": { bg: "rgba(248,244,239,0.97)", text: "#1C1C1C", sub: "#8C7B6B", accent: "#B8860B", border: "rgba(184,134,11,0.3)",fontStyle: "Georgia, serif" },
  "chaotic-meme":   { bg: "rgba(0,0,0,0.95)",       text: "#FFFFFF", sub: "#999999", accent: "#FF006E", border: "rgba(255,0,110,0.4)", fontStyle: "'Arial Black', sans-serif" },
};

// Print overlay position per product type
const PRINT_POSITION: Record<string, { top: string; left: string; right: string; maxWidth: string }> = {
  hoodie:  { top: "28%", left: "22%", right: "22%", maxWidth: "56%" },
  tshirt:  { top: "26%", left: "24%", right: "24%", maxWidth: "52%" },
  mug:     { top: "22%", left: "12%", right: "12%", maxWidth: "76%" },
  tote:    { top: "24%", left: "18%", right: "18%", maxWidth: "64%" },
  journal: { top: "20%", left: "26%", right: "10%", maxWidth: "64%" },
  sticker: { top: "14%", left: "14%", right: "14%", maxWidth: "72%" },
};

interface ProductMockupProps {
  type: string;
  definition: Definition;
  theme: AestheticTheme;
  compact?: boolean;
}

export function ProductMockup({ type, definition, theme, compact = false }: ProductMockupProps) {
  const photoUrl = PRODUCT_PHOTOS[type] || PRODUCT_PHOTOS.hoodie;
  const t = THEME_STYLES[theme] || THEME_STYLES.minimal;
  const pos = PRINT_POSITION[type] || PRINT_POSITION.hoodie;

  // Strip emojis from all text
  const stripEmoji = (str: string) =>
    str.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "").trim();

  const name = stripEmoji(definition.name);
  const pos_text = stripEmoji(definition.partOfSpeech);
  const defs = definition.definitions
    .slice(0, compact ? 2 : 3)
    .map(d => ({ ...d, text: stripEmoji(d.text) }));

  const fontSize = compact ? "7px" : "9px";
  const nameSize = compact ? "14px" : "18px";
  const lineHeight = compact ? "1.35" : "1.5";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", background: "#f4f4f4" }}>
      {/* Real product photo */}
      <Image
        src={photoUrl}
        alt={`${type} product mockup`}
        fill
        style={{ objectFit: "contain", objectPosition: "center" }}
        sizes="(max-width: 768px) 50vw, 300px"
        unoptimized
      />

      {/* Definition text overlay — sits over the print area */}
      <div style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        right: pos.right,
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: compact ? "6px" : "8px",
        padding: compact ? "7px 9px" : "10px 13px",
        backdropFilter: "blur(2px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
        fontFamily: t.fontStyle,
        pointerEvents: "none",
      }}>
        {/* Name */}
        <div style={{
          fontSize: nameSize,
          fontWeight: 700,
          color: t.text,
          lineHeight: 1.1,
          marginBottom: "2px",
          fontFamily: t.fontStyle,
        }}>
          {name}
        </div>

        {/* Part of speech */}
        <div style={{
          fontSize: compact ? "6px" : "8px",
          fontStyle: "italic",
          color: t.sub,
          marginBottom: compact ? "5px" : "7px",
          fontFamily: t.fontStyle,
        }}>
          {pos_text}
        </div>

        {/* Divider */}
        <div style={{
          height: "0.5px",
          background: t.text,
          opacity: 0.12,
          marginBottom: compact ? "5px" : "7px",
        }} />

        {/* Definitions */}
        <div style={{ display: "flex", flexDirection: "column", gap: compact ? "4px" : "6px" }}>
          {defs.map((d, i) => (
            <div key={d.number} style={{ display: "flex", gap: "5px", alignItems: "flex-start" }}>
              <span style={{
                fontSize: compact ? "6px" : "7.5px",
                color: t.sub,
                fontFamily: "monospace",
                flexShrink: 0,
                lineHeight: lineHeight,
                paddingTop: "1px",
              }}>
                {d.number}.
              </span>
              <span style={{
                fontSize,
                color: t.text,
                lineHeight,
                opacity: 0.88,
                fontFamily: t.fontStyle,
              }}>
                {d.text.length > (compact ? 55 : 80)
                  ? d.text.slice(0, compact ? 55 : 80) + "..."
                  : d.text}
              </span>
            </div>
          ))}
        </div>

        {/* Brand watermark */}
        {!compact && (
          <div style={{
            marginTop: "7px",
            fontSize: "6px",
            color: t.accent,
            opacity: 0.5,
            textAlign: "center",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}>
            defined.app
          </div>
        )}
      </div>
    </div>
  );
}

// Keep named exports for backward compatibility
export function HoodieMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="hoodie" {...props} />;
}
export function TshirtMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="tshirt" {...props} />;
}
export function MugMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="mug" {...props} />;
}
export function ToteMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="tote" {...props} />;
}
export function JournalMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="journal" {...props} />;
}
export function StickerMockup(props: { definition: Definition; theme: AestheticTheme; compact?: boolean }) {
  return <ProductMockup type="sticker" {...props} />;
}
