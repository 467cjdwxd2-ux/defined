import OpenAI from "openai";
import type { GeneratorInput, Definition, DefinitionEntry, Tone, RelationshipType } from "@/types";
import { generateId, isPet } from "./utils";

// Uses Google Gemini via its OpenAI-compatible API (free tier)
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/openai/",
});

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  chaotic:
    "Write in an unhinged, unpredictable, barely-holding-it-together style. Think 3am energy, random caps, absolutely feral observations.",
  savage:
    "Write with devastating accuracy and zero apology. Roast the person lovingly but mercilessly. Hold nothing back.",
  wholesome:
    "Write with deep warmth and genuine affection. Make it sweet enough to screenshot and send to your mom group.",
  romantic:
    "Write with intense poetic devotion. This person is a main character in someone's romance novel.",
  "pet-goblin":
    "Write from the perspective of someone absolutely obsessed with their pet. Maximum chaos energy. This animal is a deity.",
  "emotionally-unstable":
    "Write like a Tumblr post and a therapy journal had a baby. Deeply accurate, mildly devastating.",
  "main-character":
    "Write like this person is the protagonist of a coming-of-age film. Dramatic, self-aware, iconic.",
  "soft-cozy":
    "Write with cottagecore, linen-shirt, book-in-hand energy. Gentle and grounding.",
  "delusional-confidence":
    "Write like this person has never once doubted themselves and it's somehow working. Chaotic self-assurance.",
  "gremlin-energy":
    "Write with goblin mode activated. Feral, unfiltered, somehow relatable. Embrace the chaos.",
};

const RELATIONSHIP_CONTEXT: Record<RelationshipType, string> = {
  dog: "a beloved pet dog who is treated like royalty and absolute chaos",
  cat: "a cat who has everyone wrapped around their paw and knows it",
  horse: "a horse who is basically a 1200-pound emotional support animal",
  "best-friend": "a best friend who knows too much and loves anyway",
  boyfriend: "a romantic partner (boyfriend) with all their lovable flaws",
  girlfriend: "a romantic partner (girlfriend) with all their lovable flaws",
  husband: "a husband who is deeply known and affectionately roasted",
  wife: "a wife who runs everything and deserves a documentary",
  mom: "a mom who sacrificed everything and has opinions about everything",
  dad: "a dad with dad jokes, dad energy, and inexplicable dad skills",
  coworker: "a coworker you've formed an unlikely emotional bond with",
  child: "a child (human offspring) who is chaotic good personified",
  yourself: "the person themselves — self-aware, self-roasting, self-loving",
};

function buildSystemPrompt(): string {
  return `You are the world's most accurate, funniest, and emotionally intelligent fake dictionary writer.

You write Urban Dictionary-meets-Merriam-Webster definitions that feel:
- Deeply personally accurate
- Hilariously specific
- Emotionally intelligent
- Screenshot-worthy
- TikTok comment section energy
- Meme-native but not cringe
- Affectionately devastating

Rules:
- Each definition entry should be 1-2 sentences max
- Use lowercase for the definition text (it reads better)
- Be specific, not generic
- Reference real behaviors, not vibes
- Include concrete, relatable details
- Avoid corporate humor, dad jokes, or anything a 45-year-old marketing team would write
- No offensive content, slurs, or genuinely hurtful material
- The goal is "omg this is SO accurate" not "this is mean"
- Keep it funny but never cruel
- Make it feel handcrafted for this specific person

Output ONLY valid JSON. No explanation, no markdown, no extra text.`;
}

function buildUserPrompt(input: GeneratorInput): string {
  const toneInstruction = TONE_INSTRUCTIONS[input.tone];
  const relationshipContext = RELATIONSHIP_CONTEXT[input.relationship];
  const petMode = isPet(input.relationship);

  return `Generate 4 fake dictionary definitions for "${input.name}".

Context:
- This is ${relationshipContext}
- Traits: ${input.traits || "not specified — infer from relationship type"}
${input.memories ? `- Inside jokes / memories: ${input.memories}` : ""}
- Tone: ${toneInstruction}
${petMode ? "- This is a PET. Write about their animal behaviors, chaotic nature, and the owner's absolute obsession with them." : ""}

Return this exact JSON structure:
{
  "name": "${input.name}",
  "partOfSpeech": "noun",
  "pronunciation": "/${input.name.toLowerCase()}/",
  "origin": "a short, funny fake etymology in 10 words or less",
  "definitions": [
    {
      "number": 1,
      "text": "definition text here",
      "example": "optional short usage example (optional, include for 2 out of 4)",
      "emoji": "one relevant emoji"
    },
    {
      "number": 2,
      "text": "definition text here",
      "emoji": "one relevant emoji"
    },
    {
      "number": 3,
      "text": "definition text here",
      "example": "optional short example",
      "emoji": "one relevant emoji"
    },
    {
      "number": 4,
      "text": "definition text here",
      "emoji": "one relevant emoji"
    }
  ]
}

Make each definition feel distinct — different angle, different vibe, same person.`;
}

export async function generateDefinitions(
  input: GeneratorInput
): Promise<Definition[]> {
  const variants = 3;
  const results: Definition[] = [];

  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.95,
    max_tokens: 1200,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No content from AI");

  const parsed = JSON.parse(content);
  const base: Definition = {
    id: generateId(),
    name: parsed.name || input.name,
    partOfSpeech: parsed.partOfSpeech || "noun",
    pronunciation: parsed.pronunciation,
    origin: parsed.origin,
    definitions: parsed.definitions as DefinitionEntry[],
    tone: input.tone,
    relationship: input.relationship,
    createdAt: new Date().toISOString(),
  };

  results.push(base);

  // Generate 2 more variations with slightly different prompts
  for (let i = 1; i < variants; i++) {
    const variantResponse = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        {
          role: "user",
          content:
            buildUserPrompt(input) +
            `\n\nIMPORTANT: This is variation ${i + 1}. Make it completely different from typical definitions — push into more ${i === 1 ? "specific behavioral details" : "emotional/poetic territory"}.`,
        },
      ],
      temperature: 0.98,
      max_tokens: 1200,
      response_format: { type: "json_object" },
    });

    const varContent = variantResponse.choices[0]?.message?.content;
    if (varContent) {
      const varParsed = JSON.parse(varContent);
      results.push({
        id: generateId(),
        name: varParsed.name || input.name,
        partOfSpeech: varParsed.partOfSpeech || "noun",
        pronunciation: varParsed.pronunciation,
        origin: varParsed.origin,
        definitions: varParsed.definitions as DefinitionEntry[],
        tone: input.tone,
        relationship: input.relationship,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return results;
}

export async function remixDefinition(
  original: Definition,
  mode: "roast" | "sweeter" | "more-chaotic" | "devastating" | "pet-edition"
): Promise<Definition> {
  const modeInstructions: Record<typeof mode, string> = {
    roast:
      "Make it a loving but devastating roast. Hold nothing back while keeping it affectionate.",
    sweeter:
      "Make it warmer, more wholesome, genuinely touching. The kind that makes someone cry happy tears.",
    "more-chaotic":
      "Crank the chaos to 11. Unhinged, feral, barely coherent but somehow perfect.",
    devastating:
      "Make it emotionally accurate to the point of being a little too real. Devastating but true.",
    "pet-edition":
      "Rewrite as if the pet wrote it about their human. Maximum chaotic pet energy.",
  };

  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      { role: "system", content: buildSystemPrompt() },
      {
        role: "user",
        content: `Take these existing definitions for "${original.name}" and rewrite them in a new style:

Original definitions:
${original.definitions.map((d) => `${d.number}. ${d.text}`).join("\n")}

New direction: ${modeInstructions[mode]}

Return the same JSON structure with updated definitions.`,
      },
    ],
    temperature: 0.95,
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No content from AI");

  const parsed = JSON.parse(content);
  return {
    ...original,
    id: generateId(),
    definitions: parsed.definitions as DefinitionEntry[],
    createdAt: new Date().toISOString(),
  };
}
