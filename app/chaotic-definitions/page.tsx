import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getTrendingDefinitions } from "@/lib/supabase";
import { EXAMPLE_DEFINITIONS } from "@/lib/utils";
import { TONE_EMOJIS, TONE_LABELS, RELATIONSHIP_LABELS } from "@/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trending Definitions",
  description:
    "The most shared, most accurate, most devastating fake dictionary definitions on the internet.",
  openGraph: {
    title: "Trending Definitions | Defined",
    description: "These hit different.",
  },
};

export const revalidate = 300; // 5 minutes

export default async function ChaoticDefinitionsPage() {
  let trending: any[] = [];
  try {
    trending = await getTrendingDefinitions(12);
  } catch {
    // Fall back to examples if DB isn't configured
    trending = [];
  }

  const displayDefinitions =
    trending.length > 0 ? trending : EXAMPLE_DEFINITIONS;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-6">
            🔥 Trending
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
            The most accurate definitions
            <br />
            <span className="gradient-text">on the internet</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Community-generated. AI-powered. Dangerously specific.
          </p>
        </div>

        {/* Definitions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {displayDefinitions.map((def: any, i: number) => (
            <Link
              key={def.id || i}
              href={`/define/${encodeURIComponent(def.name.toLowerCase())}${def.id ? `?id=${def.id}` : ""}`}
              className="definition-card card-hover group block"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="tag bg-gray-50 text-gray-600 border border-gray-100 text-xs">
                  {TONE_EMOJIS[def.tone as keyof typeof TONE_EMOJIS] || "✨"}{" "}
                  {TONE_LABELS[def.tone as keyof typeof TONE_LABELS] || def.tone}
                </span>
                <span className="text-xs text-gray-400">
                  {RELATIONSHIP_LABELS[def.relationship as keyof typeof RELATIONSHIP_LABELS] ||
                    def.relationship}
                </span>
              </div>

              <div className="dict-entry">
                <h2 className="dict-name text-3xl mb-0.5">{def.name}</h2>
                <p className="dict-pos text-sm mb-4">
                  {def.partOfSpeech || def.part_of_speech}
                </p>
                <div className="space-y-2">
                  {(def.definitions || []).slice(0, 3).map((entry: any) => (
                    <div key={entry.number} className="flex gap-3">
                      <span className="text-gray-300 font-mono-custom text-xs mt-1 shrink-0">
                        {entry.number}.
                      </span>
                      <p className="text-gray-700 text-sm leading-snug">
                        {entry.emoji} {entry.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 mb-6">
            Ready to define someone in your life?
          </p>
          <Link href="/generate" className="btn-primary text-base px-8 py-4 rounded-2xl">
            ✨ Define someone now
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
