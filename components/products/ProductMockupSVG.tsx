"use client";

import type { Definition, AestheticTheme } from "@/types";

interface MockupProps {
  definition: Definition;
  theme: AestheticTheme;
  compact?: boolean;
}

const THEME_CONFIG: Record<AestheticTheme, { bg: string; text: string; accent: string; sub: string }> = {
  minimal:          { bg: "#FFFFFF", text: "#111111", accent: "#8338ec", sub: "#888888" },
  retro:            { bg: "#F5E6D3", text: "#2D1B00", accent: "#E85D04", sub: "#8B5E3C" },
  y2k:              { bg: "#FF69B4", text: "#FFFFFF", accent: "#00FFFF", sub: "#FFE4F0" },
  grunge:           { bg: "#0F0F0F", text: "#E0E0E0", accent: "#FF4500", sub: "#666666" },
  "soft-life":      { bg: "#FDF0FF", text: "#3B0764", accent: "#C026D3", sub: "#A855F7" },
  cottagecore:      { bg: "#F0EDE1", text: "#2D4A1E", accent: "#5A7A3A", sub: "#8A9E6A" },
  "luxury-neutral": { bg: "#F8F4EF", text: "#1C1C1C", accent: "#B8860B", sub: "#8C7B6B" },
  "chaotic-meme":   { bg: "#000000", text: "#FFFFFF", accent: "#FF006E", sub: "#666666" },
};

function DefinitionText({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const entries = definition.definitions.slice(0, compact ? 2 : 3);
  const fontSize = compact ? 7 : 9;
  const nameSize = compact ? 16 : 20;

  return (
    <g>
      {/* Name */}
      <text
        x="50%"
        y="0"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize={nameSize}
        fill={c.text}
      >
        {definition.name}
      </text>
      {/* Part of speech */}
      <text
        x="50%"
        y={nameSize + 4}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize={fontSize - 1}
        fill={c.sub}
      >
        {definition.partOfSpeech}
      </text>
      {/* Divider */}
      <line x1="10%" y1={nameSize + 11} x2="90%" y2={nameSize + 11} stroke={c.text} strokeOpacity="0.12" strokeWidth="0.5" />
      {/* Definitions */}
      {entries.map((entry, i) => {
        const y = nameSize + 20 + i * (fontSize * 2.8);
        const text = entry.text.length > (compact ? 42 : 55)
          ? entry.text.slice(0, compact ? 42 : 55) + "…"
          : entry.text;
        return (
          <g key={entry.number}>
            <text x="8%" y={y} fontFamily="monospace" fontSize={fontSize - 1} fill={c.sub}>
              {entry.number}.
            </text>
            <text x="17%" y={y} fontFamily="Georgia, serif" fontSize={fontSize} fill={c.text} opacity="0.85">
              {text}
            </text>
          </g>
        );
      })}
      {/* Watermark */}
      {!compact && (
        <text
          x="50%"
          y={nameSize + 24 + entries.length * (fontSize * 2.8)}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={6}
          fill={c.accent}
          opacity="0.5"
        >
          defined.app
        </text>
      )}
    </g>
  );
}

// ─── HOODIE ─────────────────────────────────────────────────
export function HoodieMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const isDark = ["grunge", "chaotic-meme", "minimal"].includes(theme) === false
    ? theme === "grunge" || theme === "chaotic-meme"
    : false;
  const fabricColor = theme === "grunge" || theme === "chaotic-meme" ? "#111111"
    : theme === "y2k" ? "#2D1B69"
    : theme === "retro" ? "#8B4513"
    : theme === "soft-life" ? "#7C3AED"
    : theme === "cottagecore" ? "#4A7C59"
    : theme === "luxury-neutral" ? "#2C2C2C"
    : "#1A1A1A";
  const fabricLight = fabricColor + "dd";
  const highlight = "rgba(255,255,255,0.06)";

  return (
    <svg viewBox="0 0 280 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="hoodie-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00000040" />
        </filter>
        <linearGradient id="hoodie-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={fabricColor} />
          <stop offset="100%" stopColor={fabricLight} />
        </linearGradient>
        <linearGradient id="sleeve-left" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor={fabricColor} />
          <stop offset="100%" stopColor={fabricColor + "99"} />
        </linearGradient>
        <linearGradient id="sleeve-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={fabricColor} />
          <stop offset="100%" stopColor={fabricColor + "99"} />
        </linearGradient>
      </defs>

      {/* Drop shadow */}
      <ellipse cx="140" cy="295" rx="90" ry="8" fill="rgba(0,0,0,0.18)" />

      {/* Left sleeve */}
      <path d="M 55 95 L 15 180 Q 12 195 22 198 L 60 200 Q 68 198 70 188 L 82 120 Z"
        fill="url(#sleeve-left)" />
      <path d="M 55 95 L 82 120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Right sleeve */}
      <path d="M 225 95 L 265 180 Q 268 195 258 198 L 220 200 Q 212 198 210 188 L 198 120 Z"
        fill="url(#sleeve-right)" />

      {/* Main body */}
      <path d="M 80 92 L 80 272 Q 80 282 90 282 L 190 282 Q 200 282 200 272 L 200 92 Z"
        fill="url(#hoodie-grad)" />

      {/* Hood left panel */}
      <path d="M 80 92 Q 78 60 100 45 Q 120 32 140 30 Q 120 40 115 65 L 110 92 Z"
        fill={fabricColor} />
      {/* Hood right panel */}
      <path d="M 200 92 Q 202 60 180 45 Q 160 32 140 30 Q 160 40 165 65 L 170 92 Z"
        fill={fabricLight} />
      {/* Hood center seam */}
      <line x1="140" y1="30" x2="140" y2="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Neckline */}
      <path d="M 110 92 Q 125 85 140 84 Q 155 85 170 92"
        fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* Drawstrings */}
      <line x1="130" y1="84" x2="122" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="2,1" />
      <line x1="150" y1="84" x2="158" y2="145" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="2,1" />
      <circle cx="122" cy="147" r="2.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="158" cy="147" r="2.5" fill="rgba(255,255,255,0.3)" />

      {/* Cuff left */}
      <path d="M 15 178 Q 12 195 22 198 L 60 200 Q 65 200 68 196 L 72 185"
        fill={fabricColor} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Cuff right */}
      <path d="M 265 178 Q 268 195 258 198 L 220 200 Q 215 200 212 196 L 208 185"
        fill={fabricColor} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Bottom hem */}
      <rect x="80" y="273" width="120" height="9" rx="2" fill={fabricLight} />

      {/* Kangaroo pocket */}
      <path d="M 103 210 Q 103 246 112 250 L 168 250 Q 177 246 177 210 Z"
        fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <line x1="140" y1="210" x2="140" y2="249" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

      {/* Highlight on left shoulder */}
      <path d="M 80 92 L 115 92 L 110 140 L 80 130 Z"
        fill={highlight} />

      {/* PRINT AREA — chest */}
      <g transform={compact ? "translate(95, 100)" : "translate(88, 102)"}>
        <svg width={compact ? "90" : "104"} height={compact ? "80" : "95"} viewBox="0 0 104 95">
          <DefinitionText definition={definition} theme={theme} compact={compact} />
        </svg>
      </g>
    </svg>
  );
}

// ─── MUG ────────────────────────────────────────────────────
export function MugMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const mugColor = theme === "grunge" || theme === "chaotic-meme" ? "#1a1a1a"
    : theme === "y2k" ? "#FFB7DD"
    : theme === "retro" ? "#F5E6D3"
    : "#FFFFFF";
  const rimColor = theme === "grunge" || theme === "chaotic-meme" ? "#333" : "#E8E8E8";

  return (
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="mug-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
          <stop offset="25%" stopColor="rgba(0,0,0,0)" />
          <stop offset="75%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id="mug-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={rimColor} />
          <stop offset="100%" stopColor={mugColor} />
        </linearGradient>
        <filter id="mug-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#00000030" />
        </filter>
        <clipPath id="mug-clip">
          <rect x="35" y="55" width="145" height="155" rx="6" />
        </clipPath>
      </defs>

      {/* Surface shadow */}
      <ellipse cx="120" cy="228" rx="80" ry="7" fill="rgba(0,0,0,0.12)" />

      {/* Handle */}
      <path d="M 178 95 Q 215 95 215 140 Q 215 185 178 185"
        fill="none" stroke={rimColor} strokeWidth="18" strokeLinecap="round" />
      <path d="M 178 95 Q 208 95 208 140 Q 208 185 178 185"
        fill="none" stroke={mugColor} strokeWidth="10" strokeLinecap="round" />

      {/* Mug body */}
      <rect x="35" y="55" width="145" height="155" rx="6" fill={mugColor} filter="url(#mug-shadow)" />

      {/* Inner print area */}
      <rect x="35" y="55" width="145" height="155" rx="6" fill="url(#mug-body)" />

      {/* Top rim ellipse */}
      <ellipse cx="112" cy="58" rx="72.5" ry="10" fill={rimColor} />
      <ellipse cx="112" cy="56" rx="72.5" ry="9" fill="#F0F0F0" />

      {/* Coffee surface */}
      <ellipse cx="112" cy="57" rx="65" ry="7.5" fill="#6B3A2A" opacity="0.85" />
      <ellipse cx="112" cy="57" rx="58" ry="5.5" fill="#7C4A35" />

      {/* Steam wisps */}
      <path d="M 95 45 Q 92 35 96 25 Q 100 15 97 5" fill="none" stroke="rgba(180,180,180,0.4)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 112 42 Q 109 30 113 20 Q 117 10 114 0" fill="none" stroke="rgba(180,180,180,0.35)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 129 45 Q 126 35 130 25 Q 134 15 131 5" fill="none" stroke="rgba(180,180,180,0.3)" strokeWidth="2" strokeLinecap="round" />

      {/* Bottom rim */}
      <ellipse cx="112" cy="210" rx="72.5" ry="9" fill={rimColor} opacity="0.6" />

      {/* Definition text printed on mug */}
      <g clipPath="url(#mug-clip)">
        <g transform={compact ? "translate(45, 75)" : "translate(42, 72)"}>
          <svg width={compact ? "125" : "130"} height={compact ? "120" : "130"} viewBox="0 0 130 130">
            <DefinitionText definition={definition} theme={theme} compact={compact} />
          </svg>
        </g>
      </g>

      {/* Sheen overlay */}
      <rect x="35" y="55" width="35" height="155" rx="6" fill="url(#mug-body)" opacity="0.4" />
    </svg>
  );
}

// ─── T-SHIRT ─────────────────────────────────────────────────
export function TshirtMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const shirtColor = theme === "grunge" || theme === "chaotic-meme" ? "#111111"
    : theme === "y2k" ? "#E8C4E8"
    : theme === "retro" ? "#F5DEB3"
    : theme === "soft-life" ? "#EDE9FE"
    : "#FFFFFF";
  const shirtDark = shirtColor + "cc";

  return (
    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="shirt-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shirtColor} />
          <stop offset="100%" stopColor={shirtDark} />
        </linearGradient>
        <filter id="shirt-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#00000025" />
        </filter>
      </defs>

      <ellipse cx="140" cy="275" rx="85" ry="6" fill="rgba(0,0,0,0.1)" />

      {/* Left sleeve */}
      <path d="M 85 70 L 20 115 Q 14 125 18 133 L 45 155 Q 54 159 60 150 L 95 108 Z"
        fill="url(#shirt-grad)" filter="url(#shirt-shadow)" />
      {/* Right sleeve */}
      <path d="M 195 70 L 260 115 Q 266 125 262 133 L 235 155 Q 226 159 220 150 L 185 108 Z"
        fill="url(#shirt-grad)" filter="url(#shirt-shadow)" />

      {/* Main body */}
      <path d="M 82 68 L 82 265 Q 82 272 90 272 L 190 272 Q 198 272 198 265 L 198 68 Z"
        fill="url(#shirt-grad)" filter="url(#shirt-shadow)" />

      {/* Collar */}
      <path d="M 108 68 Q 125 58 140 57 Q 155 58 172 68"
        fill={shirtColor} stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
      <path d="M 108 68 Q 120 78 140 80 Q 160 78 172 68"
        fill={shirtColor} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* Sleeve seams */}
      <path d="M 85 70 L 95 108" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <path d="M 195 70 L 185 108" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* Side fold highlights */}
      <path d="M 82 100 L 82 220 Q 86 215 88 180 Q 90 150 88 100 Z"
        fill="rgba(0,0,0,0.04)" />
      <path d="M 198 100 L 198 220 Q 194 215 192 180 Q 190 150 192 100 Z"
        fill="rgba(0,0,0,0.04)" />

      {/* Hem */}
      <path d="M 82 262 Q 90 272 140 272 Q 190 272 198 262"
        fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />

      {/* Print area */}
      <g transform={compact ? "translate(96, 95)" : "translate(90, 92)"}>
        <svg width={compact ? "88" : "100"} height={compact ? "80" : "95"} viewBox="0 0 100 95">
          <DefinitionText definition={definition} theme={theme} compact={compact} />
        </svg>
      </g>
    </svg>
  );
}

// ─── TOTE BAG ────────────────────────────────────────────────
export function ToteMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const bagColor = theme === "grunge" || theme === "chaotic-meme" ? "#1A1A1A"
    : theme === "y2k" ? "#FFB3D1"
    : theme === "retro" ? "#D4A96A"
    : theme === "soft-life" ? "#DDD6FE"
    : "#E8DCC8";
  const strapColor = theme === "grunge" || theme === "chaotic-meme" ? "#333" : "#C9BB99";

  return (
    <svg viewBox="0 0 260 290" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="tote-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bagColor} />
          <stop offset="100%" stopColor={bagColor + "dd"} />
        </linearGradient>
        <linearGradient id="tote-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <filter id="tote-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00000030" />
        </filter>
      </defs>

      <ellipse cx="130" cy="284" rx="80" ry="6" fill="rgba(0,0,0,0.1)" />

      {/* Left strap */}
      <path d="M 88 80 Q 88 30 105 20 Q 118 12 118 70"
        fill="none" stroke={strapColor} strokeWidth="14" strokeLinecap="round" />
      <path d="M 88 80 Q 88 30 105 20 Q 118 12 118 70"
        fill="none" stroke={bagColor} strokeWidth="8" strokeLinecap="round" />
      {/* Right strap */}
      <path d="M 172 80 Q 172 30 155 20 Q 142 12 142 70"
        fill="none" stroke={strapColor} strokeWidth="14" strokeLinecap="round" />
      <path d="M 172 80 Q 172 30 155 20 Q 142 12 142 70"
        fill="none" stroke={bagColor} strokeWidth="8" strokeLinecap="round" />

      {/* Bag body */}
      <path d="M 45 75 Q 42 78 42 82 L 42 258 Q 42 268 52 270 L 208 270 Q 218 268 218 258 L 218 82 Q 218 78 215 75 Z"
        fill="url(#tote-grad)" filter="url(#tote-shadow)" />

      {/* Top fold/hem */}
      <rect x="42" y="73" width="176" height="14" rx="3" fill={strapColor} opacity="0.5" />

      {/* Side gussets */}
      <rect x="42" y="73" width="18" height="197" rx="2" fill="url(#tote-side)" />
      <rect x="200" y="73" width="18" height="197" rx="2" fill="url(#tote-side)" transform="scale(-1,1) translate(-260,0)" />

      {/* Bottom seam */}
      <line x1="52" y1="258" x2="208" y2="258" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />

      {/* Canvas texture lines */}
      {[100, 125, 150, 175, 200, 225].map(y => (
        <line key={y} x1="52" y1={y} x2="208" y2={y} stroke="rgba(0,0,0,0.03)" strokeWidth="0.8" />
      ))}

      {/* Print area */}
      <g transform={compact ? "translate(65, 100)" : "translate(60, 98)"}>
        <svg width={compact ? "130" : "140"} height={compact ? "130" : "145"} viewBox="0 0 140 145">
          <DefinitionText definition={definition} theme={theme} compact={compact} />
        </svg>
      </g>
    </svg>
  );
}

// ─── JOURNAL ─────────────────────────────────────────────────
export function JournalMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];
  const coverColor = theme === "grunge" || theme === "chaotic-meme" ? "#0F0F0F"
    : theme === "y2k" ? "#4A0080"
    : theme === "retro" ? "#8B4513"
    : theme === "soft-life" ? "#4C1D95"
    : theme === "cottagecore" ? "#2D4A1E"
    : theme === "luxury-neutral" ? "#1C1C1C"
    : "#1E1B4B";
  const spineColor = coverColor + "cc";
  const pageColor = "#F5F0EB";

  return (
    <svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="journal-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={coverColor} />
          <stop offset="100%" stopColor={coverColor + "bb"} />
        </linearGradient>
        <linearGradient id="page-grad" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor={pageColor} />
          <stop offset="100%" stopColor="#E8E0D5" />
        </linearGradient>
        <filter id="journal-shadow">
          <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#00000040" />
        </filter>
      </defs>

      <ellipse cx="130" cy="294" rx="90" ry="6" fill="rgba(0,0,0,0.15)" />

      {/* Page edges (right side) */}
      {[3, 6, 9].map(i => (
        <rect key={i} x={195 + i * 2} y={22 + i} width={14 - i * 2} height={258 - i * 2}
          rx="1" fill={pageColor} opacity={0.6 - i * 0.1} />
      ))}

      {/* Spine */}
      <rect x="28" y="18" width="20" height="264" rx="3" fill={spineColor} filter="url(#journal-shadow)" />

      {/* Cover */}
      <rect x="38" y="18" width="170" height="264" rx="4" fill="url(#journal-cover)" filter="url(#journal-shadow)" />

      {/* Cover texture lines */}
      <rect x="38" y="18" width="170" height="264" rx="4"
        fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

      {/* Spine binding lines */}
      {[50, 80, 220, 250].map(y => (
        <line key={y} x1="28" y1={y} x2="48" y2={y}
          stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      ))}
      {/* Spine highlight */}
      <rect x="28" y="18" width="5" height="264" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* Cover gold trim line */}
      <rect x="52" y="32" width="142" height="240" rx="3"
        fill="none" stroke={c.accent} strokeWidth="0.8" opacity="0.4" />

      {/* Elastic band */}
      <rect x="178" y="18" width="4" height="264" rx="2" fill="rgba(255,255,255,0.15)" />

      {/* Print area */}
      <g transform={compact ? "translate(60, 50)" : "translate(58, 52)"}>
        <svg width={compact ? "118" : "122"} height={compact ? "160" : "176"} viewBox="0 0 122 176">
          <DefinitionText definition={definition} theme={theme} compact={compact} />
        </svg>
      </g>
    </svg>
  );
}

// ─── STICKER ─────────────────────────────────────────────────
export function StickerMockup({ definition, theme, compact }: MockupProps) {
  const c = THEME_CONFIG[theme];

  return (
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="sticker-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#00000035" />
        </filter>
        <linearGradient id="sticker-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.bg} />
          <stop offset="100%" stopColor={c.bg + "f0"} />
        </linearGradient>
      </defs>

      {/* Peel shadow */}
      <ellipse cx="120" cy="228" rx="85" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* White border / bleed */}
      <rect x="18" y="18" width="204" height="204" rx="32" fill="#FFFFFF" filter="url(#sticker-shadow)" />

      {/* Sticker body */}
      <rect x="26" y="26" width="188" height="188" rx="26" fill="url(#sticker-bg)" />

      {/* Accent border */}
      <rect x="34" y="34" width="172" height="172" rx="20"
        fill="none" stroke={c.accent} strokeWidth="1.5" opacity="0.4" />

      {/* Die-cut corner effect */}
      <rect x="18" y="18" width="204" height="204" rx="32"
        fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

      {/* Print area */}
      <g transform={compact ? "translate(38, 45)" : "translate(35, 42)"}>
        <svg width={compact ? "164" : "170"} height={compact ? "150" : "160"} viewBox="0 0 170 160">
          <DefinitionText definition={definition} theme={theme} compact={compact} />
        </svg>
      </g>
    </svg>
  );
}

// ─── Unified export ──────────────────────────────────────────
export function ProductMockup({ type, definition, theme, compact = false }: {
  type: string;
  definition: Definition;
  theme: AestheticTheme;
  compact?: boolean;
}) {
  const props = { definition, theme, compact };
  switch (type) {
    case "hoodie":  return <HoodieMockup {...props} />;
    case "tshirt":  return <TshirtMockup {...props} />;
    case "mug":     return <MugMockup {...props} />;
    case "tote":    return <ToteMockup {...props} />;
    case "journal": return <JournalMockup {...props} />;
    case "sticker": return <StickerMockup {...props} />;
    default:        return <HoodieMockup {...props} />;
  }
}
