export type Tone =
  | "chaotic"
  | "savage"
  | "wholesome"
  | "romantic"
  | "pet-goblin"
  | "emotionally-unstable"
  | "main-character"
  | "soft-cozy"
  | "delusional-confidence"
  | "gremlin-energy";

export type RelationshipType =
  | "dog"
  | "cat"
  | "horse"
  | "best-friend"
  | "boyfriend"
  | "girlfriend"
  | "husband"
  | "wife"
  | "mom"
  | "dad"
  | "coworker"
  | "child"
  | "yourself";

export type ProductType =
  | "hoodie"
  | "tshirt"
  | "journal"
  | "mug"
  | "tote"
  | "sticker";

export type AestheticTheme =
  | "minimal"
  | "retro"
  | "y2k"
  | "grunge"
  | "soft-life"
  | "cottagecore"
  | "luxury-neutral"
  | "chaotic-meme";

export interface GeneratorInput {
  name: string;
  relationship: RelationshipType;
  traits: string;
  memories?: string;
  tone: Tone;
}

export interface Definition {
  id: string;
  name: string;
  partOfSpeech: string;
  definitions: DefinitionEntry[];
  pronunciation?: string;
  origin?: string;
  tone: Tone;
  relationship: RelationshipType;
  createdAt: string;
}

export interface DefinitionEntry {
  number: number;
  text: string;
  example?: string;
  emoji?: string;
}

export interface ProductConfig {
  type: ProductType;
  theme: AestheticTheme;
  colorVariant: "light" | "dark";
  font: FontOption;
  size?: string;
  color?: string;
}

export type FontOption =
  | "serif-classic"
  | "sans-modern"
  | "mono-nerd"
  | "display-bold"
  | "handwritten";

export interface CartItem {
  definitionId: string;
  definition: Definition;
  product: ProductConfig;
  quantity: number;
  price: number;
  printifyProductId?: string;
  printifyVariantId?: number;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  stripeSessionId: string;
  printifyOrderId?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  savedDefinitions: Definition[];
  orders: Order[];
  favoriteTheme?: AestheticTheme;
}

export interface ShareCard {
  definitionId: string;
  format: "square" | "story" | "tiktok";
  theme: AestheticTheme;
  imageUrl?: string;
}

export const TONE_LABELS: Record<Tone, string> = {
  chaotic: "Chaotic",
  savage: "Savage",
  wholesome: "Wholesome",
  romantic: "Romantic",
  "pet-goblin": "Pet Goblin",
  "emotionally-unstable": "Emotionally Unstable",
  "main-character": "Main Character",
  "soft-cozy": "Soft & Cozy",
  "delusional-confidence": "Delusional Confidence",
  "gremlin-energy": "Gremlin Energy",
};

export const TONE_EMOJIS: Record<Tone, string> = {
  chaotic: "🌪️",
  savage: "🔥",
  wholesome: "🌸",
  romantic: "💕",
  "pet-goblin": "🐾",
  "emotionally-unstable": "😭",
  "main-character": "✨",
  "soft-cozy": "🍵",
  "delusional-confidence": "👑",
  "gremlin-energy": "😈",
};

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  dog: "Dog 🐶",
  cat: "Cat 🐱",
  horse: "Horse 🐴",
  "best-friend": "Best Friend",
  boyfriend: "Boyfriend",
  girlfriend: "Girlfriend",
  husband: "Husband",
  wife: "Wife",
  mom: "Mom",
  dad: "Dad",
  coworker: "Coworker",
  child: "Child",
  yourself: "Yourself",
};

export const PRODUCT_LABELS: Record<ProductType, string> = {
  hoodie: "Hoodie",
  tshirt: "T-Shirt",
  journal: "Journal",
  mug: "Mug",
  tote: "Tote Bag",
  sticker: "Sticker",
};

export const PRODUCT_PRICES: Record<ProductType, number> = {
  hoodie: 49.99,
  tshirt: 32.99,
  journal: 24.99,
  mug: 19.99,
  tote: 27.99,
  sticker: 6.99,
};

export const THEME_LABELS: Record<AestheticTheme, string> = {
  minimal: "Minimal",
  retro: "Retro",
  y2k: "Y2K",
  grunge: "Grunge",
  "soft-life": "Soft Life",
  cottagecore: "Cottagecore",
  "luxury-neutral": "Luxury Neutral",
  "chaotic-meme": "Chaotic Meme",
};
