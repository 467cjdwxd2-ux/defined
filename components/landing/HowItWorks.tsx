"use client";

import { motion } from "framer-motion";
import { Type, Sparkles, ShoppingBag, Share2 } from "lucide-react";

const steps = [
  {
    icon: Type,
    number: "01",
    title: "Type a name",
    description:
      "Enter any name — human, pet, or chaotic coworker. Add their personality traits and vibe for maximum accuracy.",
    color: "from-brand-400 to-brand-600",
    bg: "bg-brand-50",
    accent: "text-brand-500",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "AI generates the truth",
    description:
      "Our AI produces 3 hilariously accurate fake dictionary definitions. Choose the one that's the most devastating.",
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-50",
    accent: "text-purple-500",
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: "Preview on products",
    description:
      "Instantly see your definition on hoodies, mugs, journals, and more. Pick your aesthetic theme and colors.",
    color: "from-chaos-orange to-chaos-yellow",
    bg: "bg-orange-50",
    accent: "text-orange-500",
  },
  {
    icon: Share2,
    number: "04",
    title: "Share or buy",
    description:
      "Download a share card for TikTok/Instagram, or order the actual product. Either way, someone's getting exposed.",
    color: "from-chaos-pink to-brand-500",
    bg: "bg-pink-50",
    accent: "text-pink-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Embarrassingly <span className="gradient-text">simple</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From blank page to "omg this is too accurate" in about 60 seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-gray-200 to-gray-100 z-0" />
              )}

              <div className="relative z-10 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-md`}
                >
                  <step.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <div className={`text-xs font-bold font-mono-custom ${step.accent} mb-2`}>
                  STEP {step.number}
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
