import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatPriceFromDollars(dollars: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars);
}

export function isPet(relationship: string): boolean {
  return ["dog", "cat", "horse"].includes(relationship);
}

export function getRelationshipPronoun(
  relationship: string,
  possessive = false
): string {
  const pronouns: Record<string, { subject: string; possessive: string }> = {
    dog: { subject: "they", possessive: "their" },
    cat: { subject: "they", possessive: "their" },
    horse: { subject: "they", possessive: "their" },
    "best-friend": { subject: "they", possessive: "their" },
    boyfriend: { subject: "he", possessive: "his" },
    girlfriend: { subject: "she", possessive: "her" },
    husband: { subject: "he", possessive: "his" },
    wife: { subject: "she", possessive: "her" },
    mom: { subject: "she", possessive: "her" },
    dad: { subject: "he", possessive: "his" },
    coworker: { subject: "they", possessive: "their" },
    child: { subject: "they", possessive: "their" },
    yourself: { subject: "you", possessive: "your" },
  };
  const p = pronouns[relationship] || { subject: "they", possessive: "their" };
  return possessive ? p.possessive : p.subject;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "…";
}

export const EXAMPLE_DEFINITIONS = [
  {
    name: "Natalie",
    partOfSpeech: "noun",
    definitions: [
      {
        number: 1,
        text: "survives entirely on caffeine, chaos, and emotionally devastating Spotify playlists",
        emoji: "☕",
      },
      {
        number: 2,
        text: "somehow both the therapist friend AND the problem — quantum emotional state",
        emoji: "🌀",
      },
      {
        number: 3,
        text: "believes that lighting a candle and crying to Phoebe Bridgers counts as self-care",
        emoji: "🕯️",
      },
    ],
    tone: "emotionally-unstable" as const,
    relationship: "best-friend" as const,
  },
  {
    name: "Biscuit",
    partOfSpeech: "noun",
    definitions: [
      {
        number: 1,
        text: "a 12-pound golden entity who has never experienced self-doubt and radiates pure chaotic joy",
        emoji: "🐾",
      },
      {
        number: 2,
        text: "operates on two modes: zooming at 3am and existential sleeping",
        emoji: "💨",
      },
      {
        number: 3,
        text: "sole heir to the couch despite being explicitly told no — every single day",
        emoji: "👑",
      },
    ],
    tone: "pet-goblin" as const,
    relationship: "dog" as const,
  },
  {
    name: "Marcus",
    partOfSpeech: "noun",
    definitions: [
      {
        number: 1,
        text: "statistically the most confident person in any room, regardless of qualifications",
        emoji: "💪",
      },
      {
        number: 2,
        text: "will offer unsolicited life advice while simultaneously ignoring their own",
        emoji: "🎯",
      },
      {
        number: 3,
        text: "texts back immediately when it's funny but leaves serious messages on read for 72 hours",
        emoji: "📱",
      },
    ],
    tone: "savage" as const,
    relationship: "best-friend" as const,
  },
];
