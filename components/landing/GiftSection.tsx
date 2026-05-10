"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gift, Heart, Zap, Camera } from "lucide-react";

const occasions = [
  {
    icon: "🎂",
    title: "Birthdays",
    description: "A gift so personal it's almost illegal.",
  },
  {
    icon: "💝",
    title: "Valentine's Day",
    description: "Romantic roasting at its finest.",
  },
  {
    icon: "🎓",
    title: "Graduation",
    description: "Celebrate who they really are.",
  },
  {
    icon: "🏡",
    title: "Housewarming",
    description: "Define the chaos that moved in.",
  },
  {
    icon: "🐾",
    title: "Pet Parents",
    description: "Because Biscuit deserves recognition.",
  },
  {
    icon: "👔",
    title: "Work Gifts",
    description: "Professionally devastating.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Instant preview",
    description: "See exactly how it'll look before you buy",
  },
  {
    icon: Camera,
    title: "Free share cards",
    description: "Download aesthetic cards for social media",
  },
  {
    icon: Gift,
    title: "Gift wrapping",
    description: "Ships in beautiful branded packaging",
  },
  {
    icon: Heart,
    title: "Made with love",
    description: "And a concerning amount of AI charisma",
  },
];

export default function GiftSection() {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-4">
              The gift that says{" "}
              <span className="gradient-text">"I see you"</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Generic gifts are forgettable. A fake dictionary definition of
              someone's exact chaotic energy? That gets photographed, framed,
              and referenced in their vows.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {occasions.map((occasion, i) => (
                <motion.div
                  key={occasion.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100"
                >
                  <span className="text-xl">{occasion.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {occasion.title}
                    </p>
                    <p className="text-xs text-gray-500">{occasion.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/generate" className="btn-primary text-base px-8 py-4 rounded-2xl">
              <Gift className="w-5 h-5" />
              Make a gift
            </Link>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Price callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-500 to-chaos-pink text-white">
              <p className="font-bold text-xl mb-1">Starting at $6.99</p>
              <p className="text-brand-100 text-sm">
                Stickers, mugs, hoodies, totes, journals, t-shirts — all
                custom-printed with your definition.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
