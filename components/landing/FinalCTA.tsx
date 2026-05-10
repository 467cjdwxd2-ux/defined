"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-600 via-purple-600 to-chaos-pink relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
            Someone in your life
            <br />
            deserves to be{" "}
            <span className="italic">defined.</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Takes 60 seconds. Costs less than brunch. Will be referenced for
            the rest of their life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-600 font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              Define someone now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/chaotic-definitions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              Browse examples first
            </Link>
          </div>

          <p className="text-white/40 text-sm mt-8">
            Free to generate · No account required · Purchase optional
          </p>
        </motion.div>
      </div>
    </section>
  );
}
