"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { ProductMockup } from "@/components/products/ProductMockupSVG";
import type { Definition, ProductType, AestheticTheme } from "@/types";

const HALL_OF_FAME: {
  definition: Definition;
  product: ProductType;
  theme: AestheticTheme;
  likes: string;
  comments: string;
  caption: string;
  tag: string;
}[] = [
  {
    definition: {
      id: "hof-1",
      name: "Morgan",
      partOfSpeech: "noun",
      pronunciation: "/ˈmɔːr.ɡən/",
      origin: "chaos, specifically",
      definitions: [
        { number: 1, text: "sends 11-minute voice memos about absolutely nothing" },
        { number: 2, text: "has 4 unread texts from their mom and zero regrets" },
        { number: 3, text: "the reason the group chat has 847 unread messages" },
      ],
      tone: "chaotic",
      relationship: "best-friend",
      createdAt: new Date().toISOString(),
    },
    product: "hoodie",
    theme: "soft-life",
    likes: "47.2K",
    comments: "3.1K",
    caption: "got my best friend the most accurate gift of all time",
    tag: "tag your most chaotic friend",
  },
  {
    definition: {
      id: "hof-2",
      name: "Becca",
      partOfSpeech: "noun",
      pronunciation: "/ˈbɛk.ə/",
      origin: "a Sephora, probably",
      definitions: [
        { number: 1, text: "cries at commercials but not at funerals" },
        { number: 2, text: "has a 47-step skincare routine and still blames genetics" },
        { number: 3, text: "manifesting her situationship into a relationship since 2019" },
      ],
      tone: "emotionally-unstable",
      relationship: "best-friend",
      createdAt: new Date().toISOString(),
    },
    product: "mug",
    theme: "luxury-neutral",
    likes: "31.8K",
    comments: "2.4K",
    caption: "she screamed when she opened it. @becca you're welcome",
    tag: "tag your skincare girl",
  },
  {
    definition: {
      id: "hof-3",
      name: "Tyler",
      partOfSpeech: "noun",
      pronunciation: "/ˈtaɪ.lər/",
      origin: "the gym, always the gym",
      definitions: [
        { number: 1, text: "describes every meal as 'hitting macros' or 'a cheat day'" },
        { number: 2, text: "has more supplements than personality" },
        { number: 3, text: "will tell you about CrossFit before you even ask" },
      ],
      tone: "savage",
      relationship: "best-friend",
      createdAt: new Date().toISOString(),
    },
    product: "tshirt",
    theme: "minimal",
    likes: "28.5K",
    comments: "1.9K",
    caption: "he wore it to the gym immediately. no notes.",
    tag: "tag your gym bro",
  },
  {
    definition: {
      id: "hof-4",
      name: "Grandma",
      partOfSpeech: "noun",
      pronunciation: "/ˈɡrænd.mɑː/",
      origin: "a simpler time",
      definitions: [
        { number: 1, text: "sends $20 in every birthday card regardless of your age" },
        { number: 2, text: "has fed armies with a single casserole dish" },
        { number: 3, text: "loves unconditionally, asks about grandchildren constantly" },
      ],
      tone: "wholesome",
      relationship: "mom",
      createdAt: new Date().toISOString(),
    },
    product: "tote",
    theme: "cottagecore",
    likes: "89.4K",
    comments: "6.7K",
    caption: "grandma cried happy tears and I've never felt more powerful",
    tag: "the perfect grandma gift",
  },
  {
    definition: {
      id: "hof-5",
      name: "Jess",
      partOfSpeech: "noun",
      pronunciation: "/dʒɛs/",
      origin: "her villain era, ongoing",
      definitions: [
        { number: 1, text: "started a business on a Tuesday and quit her job by Thursday" },
        { number: 2, text: "unbothered, moisturized, in her lane, focused" },
        { number: 3, text: "her 'no is a full sentence' energy is unmatched" },
      ],
      tone: "main-character",
      relationship: "best-friend",
      createdAt: new Date().toISOString(),
    },
    product: "journal",
    theme: "grunge",
    likes: "52.1K",
    comments: "4.2K",
    caption: "for my bestie who is THAT girl and knows it",
    tag: "tag your main character bestie",
  },
  {
    definition: {
      id: "hof-6",
      name: "Biscuit",
      partOfSpeech: "noun (dog)",
      pronunciation: "/ˈbɪs.kɪt/",
      origin: "the shelter, technically",
      definitions: [
        { number: 1, text: "has never once respected personal space and never will" },
        { number: 2, text: "treats every walk like it's the last walk on earth" },
        { number: 3, text: "aggressively mediocre at fetch but 10/10 at being loved" },
      ],
      tone: "pet-goblin",
      relationship: "dog",
      createdAt: new Date().toISOString(),
    },
    product: "sticker",
    theme: "y2k",
    likes: "104K",
    comments: "8.3K",
    caption: "defined my dog and it's disturbingly accurate",
    tag: "define your pet, I dare you",
  },
];

export default function HallOfFame() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4 border border-brand-100">
            Hall of Fame
          </span>
          <h2 className="section-title mb-4">
            Gifts that broke the{" "}
            <span className="gradient-text">group chat</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real Defined orders. Real reactions. Probably some crying.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {HALL_OF_FAME.map((item, i) => (
            <motion.div
              key={item.definition.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Social post header */}
              <div className="flex items-center gap-2.5 px-4 pt-4 pb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-chaos-pink flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {item.definition.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    @{item.definition.name.toLowerCase().replace(/\s/g, "_")}fan
                  </p>
                  <p className="text-[10px] text-gray-400">Just now</p>
                </div>
              </div>

              {/* Product mockup */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white mx-3 rounded-xl overflow-hidden"
                style={{ height: "180px" }}>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-full">
                    <ProductMockup
                      type={item.product}
                      definition={item.definition}
                      theme={item.theme}
                      compact={true}
                    />
                  </div>
                </div>
                {/* Viral badge */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                  <span className="text-[10px] font-bold text-red-500">VIRAL</span>
                </div>
              </div>

              {/* Caption */}
              <div className="px-4 pt-3 pb-1">
                <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-3 px-4 py-2">
                <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors group/like">
                  <Heart className="w-3.5 h-3.5 group-hover/like:fill-red-500 group-hover/like:text-red-500 transition-all" />
                  <span className="text-[11px] font-medium">{item.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-brand-500 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">{item.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-brand-500 transition-colors ml-auto">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tag CTA */}
              <div className="mx-4 mb-4 mt-1">
                <Link
                  href="/generate"
                  className="block w-full text-center py-2 rounded-xl bg-gray-50 hover:bg-brand-50 hover:text-brand-600 text-gray-500 text-[11px] font-semibold transition-all duration-200 border border-gray-100 hover:border-brand-200"
                >
                  {item.tag} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-gray-500 text-sm mb-5">
            Join <span className="font-bold text-gray-900">12,000+</span> people who've defined someone they love (or lovingly roasted)
          </p>
          <Link href="/generate" className="btn-primary text-base px-10 py-4 rounded-2xl">
            Create yours free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
