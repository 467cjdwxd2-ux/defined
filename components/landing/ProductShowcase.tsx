"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCT_PRICES } from "@/types";
import { EXAMPLE_DEFINITIONS } from "@/lib/utils";
import { ProductMockup } from "@/components/products/ProductMockupSVG";
import type { Definition } from "@/types";

const showcase = [
  { type: "hoodie",  theme: "minimal" as const,         label: "Hoodie",   desc: "The statement piece",       popular: true },
  { type: "mug",     theme: "luxury-neutral" as const,  label: "Mug",      desc: "Morning chaos ritual",      popular: false },
  { type: "tshirt",  theme: "soft-life" as const,       label: "T-Shirt",  desc: "Daily identity crisis",     popular: false },
  { type: "tote",    theme: "cottagecore" as const,      label: "Tote Bag", desc: "Carry the chaos",           popular: false },
  { type: "journal", theme: "grunge" as const,           label: "Journal",  desc: "Emotionally document it",   popular: false },
  { type: "sticker", theme: "y2k" as const,              label: "Sticker",  desc: "Stick it everywhere",       popular: false },
];

// Use Natalie as the demo definition
const demoDefinition: Definition = {
  id: "demo",
  name: "Natalie",
  partOfSpeech: "noun",
  pronunciation: "/ˈneɪ.tə.li/",
  origin: "chaos dimension",
  definitions: [
    { number: 1, text: "survives entirely on caffeine, chaos, and emotionally devastating Spotify playlists", emoji: "☕" },
    { number: 2, text: "somehow both the therapist friend AND the problem", emoji: "🌀" },
    { number: 3, text: "believes lighting a candle will fix the situation", emoji: "🕯️" },
  ],
  tone: "emotionally-unstable",
  relationship: "best-friend",
  createdAt: new Date().toISOString(),
};

export default function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Your definition,{" "}
            <span className="gradient-text">on everything</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From "omg I need this" to "it's at my door in 5 days."
            Every product custom-printed with your exact definition.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {showcase.map((item, i) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative group"
            >
              <Link href="/generate">
                <div className="relative p-3 pb-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-brand-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  {item.popular && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-2.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-bold whitespace-nowrap shadow-md">
                      Most popular
                    </div>
                  )}

                  {/* Product mockup */}
                  <div className={`w-full flex items-center justify-center ${item.popular ? "pt-5" : "pt-1"}`}
                    style={{ height: item.type === "journal" ? "160px" : item.type === "sticker" ? "130px" : "150px" }}>
                    <div className="w-full h-full">
                      <ProductMockup
                        type={item.type}
                        definition={demoDefinition}
                        theme={item.theme}
                        compact={true}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center mt-3">
                    <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                    <p className="text-[11px] text-gray-400 mb-1">{item.desc}</p>
                    <p className="text-sm font-semibold text-brand-500">
                      From ${PRODUCT_PRICES[item.type as keyof typeof PRODUCT_PRICES]}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/[0.03] rounded-2xl transition-colors duration-300 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400 mb-5">
            🚀 Printed on-demand · Ships in 3–5 business days · Free returns on defects
          </p>
          <Link href="/generate" className="btn-primary text-base px-8 py-4 rounded-2xl">
            Start creating
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
