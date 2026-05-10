import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDefinitionById, getDefinitionsByName } from "@/lib/supabase";
import { EXAMPLE_DEFINITIONS } from "@/lib/utils";
import { TONE_EMOJIS, TONE_LABELS } from "@/types";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  return {
    title: `${decodedName} | Defined`,
    description: `Officially and dangerously accurate definition of ${decodedName}.`,
    openGraph: {
      title: `"${decodedName}" has been officially defined`,
      description: `See the dangerously accurate fake dictionary definition of ${decodedName}.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `"${decodedName}" has been officially defined`,
      description: `Too accurate to be legal.`,
    },
  };
}

export default async function DefinePage({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { id } = await searchParams;
  const decodedName = decodeURIComponent(name);

  let definition = null;

  try {
    if (id) {
      definition = await getDefinitionById(id);
    }
    if (!definition) {
      const defs = await getDefinitionsByName(decodedName);
      definition = defs[0] || null;
    }
  } catch {
    // Fall back to examples
  }

  // Fall back to example definitions
  if (!definition) {
    const example = EXAMPLE_DEFINITIONS.find(
      (d) => d.name.toLowerCase() === decodedName.toLowerCase()
    );
    if (example) {
      definition = {
        ...example,
        id: "example",
        pronunciation: `/${decodedName.toLowerCase()}/`,
        origin: null,
        createdAt: new Date().toISOString(),
      };
    }
  }

  if (!definition) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-3xl mx-auto px-4 pt-40 pb-24 text-center">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="text-3xl font-bold font-display mb-4">
            "{decodedName}" hasn't been defined yet
          </h1>
          <p className="text-gray-500 mb-8">
            Be the first to officially expose them.
          </p>
          <Link
            href={`/generate?name=${encodeURIComponent(decodedName)}`}
            className="btn-primary"
          >
            ✨ Define {decodedName}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Defined
          </Link>
          <span>›</span>
          <Link
            href="/chaotic-definitions"
            className="hover:text-gray-600 transition-colors"
          >
            Definitions
          </Link>
          <span>›</span>
          <span className="text-gray-600">{definition.name}</span>
        </div>

        {/* Main definition card */}
        <div className="definition-card mb-6">
          {/* Tone badge */}
          {definition.tone && (
            <div className="mb-6">
              <span className="tag bg-brand-50 text-brand-700 border border-brand-100 text-sm">
                {TONE_EMOJIS[definition.tone as keyof typeof TONE_EMOJIS]}{" "}
                {TONE_LABELS[definition.tone as keyof typeof TONE_LABELS] || definition.tone}
              </span>
            </div>
          )}

          {/* Name + pronunciation */}
          <div className="mb-2">
            <h1 className="dict-name">{definition.name}</h1>
          </div>
          {definition.pronunciation && (
            <p className="dict-pronunciation mb-1">{definition.pronunciation}</p>
          )}
          <p className="dict-pos mb-4">{definition.partOfSpeech}</p>
          {definition.origin && (
            <p className="text-xs text-gray-400 italic mb-4">
              origin: {definition.origin}
            </p>
          )}

          <hr className="dict-divider mb-6" />

          <div className="space-y-5">
            {definition.definitions.map((entry: any) => (
              <div key={entry.number}>
                <div className="flex gap-4">
                  <span className="text-gray-300 font-mono-custom text-sm shrink-0 mt-1 font-bold">
                    {entry.number}.
                  </span>
                  <div>
                    <p className="dict-definition">
                      {entry.emoji && (
                        <span className="mr-2 text-xl">{entry.emoji}</span>
                      )}
                      {entry.text}
                    </p>
                    {entry.example && (
                      <p className="text-sm text-gray-400 italic mt-2">
                        "{entry.example}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            href={`/generate?name=${encodeURIComponent(definition.name)}`}
            className="btn-primary justify-center py-4 rounded-2xl"
          >
            ✨ Generate your version
          </Link>
          <Link
            href="/generate"
            className="btn-secondary justify-center py-4 rounded-2xl"
          >
            🛍️ Put this on a hoodie
          </Link>
        </div>

        {/* Share section */}
        <div className="definition-card text-center">
          <p className="text-gray-500 text-sm mb-4">
            Know someone who needs to be officially defined?
          </p>
          <Link href="/generate" className="btn-primary text-sm">
            Define someone else
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
