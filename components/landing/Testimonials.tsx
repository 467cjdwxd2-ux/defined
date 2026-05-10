"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I sent this to my best friend at 2am and she hasn't spoken to me in 3 days but she also reposted it so I think we're fine",
    author: "Emily R.",
    handle: "@emilyrchaos",
    avatar: "😭",
    product: "Hoodie",
    stars: 5,
  },
  {
    quote: "Got this for my husband for our anniversary. He called it 'devastatingly accurate'. It's on the fridge now.",
    author: "Priya K.",
    handle: "@priyak_life",
    avatar: "💕",
    product: "Mug",
    stars: 5,
  },
  {
    quote: "I made one for my dog Biscuit. The AI described him as 'a golden entity who has never once considered consequences'. That is literally him.",
    author: "Jake T.",
    handle: "@jaketerror",
    avatar: "🐾",
    product: "T-Shirt",
    stars: 5,
  },
  {
    quote: "My coworker definition said 'maintains a suspiciously cheerful disposition for someone who has seen what we've seen'. Frame-worthy.",
    author: "Aisha M.",
    handle: "@aishaworks",
    avatar: "✨",
    product: "Journal",
    stars: 5,
  },
  {
    quote: "I made one for myself on 'delusional confidence' mode and I've never felt more understood by a machine",
    author: "Tyler B.",
    handle: "@tylerb_vibes",
    avatar: "👑",
    product: "Sticker",
    stars: 5,
  },
  {
    quote: "My mom's definition said 'will text you a passive aggressive question at 7am and then deny it'. She has the mug now.",
    author: "Sofia L.",
    handle: "@sofialindqvist",
    avatar: "🍵",
    product: "Mug",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white mb-4">
            People are{" "}
            <span className="gradient-text">not okay</span> (in the best way)
          </h2>
          <p className="section-subtitle text-gray-400 mx-auto">
            Real reviews from real people who have been emotionally exposed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-brand-500/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-yellow-400 text-sm">
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-5 font-display italic">
                "{t.quote}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-base">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.author}</p>
                    <p className="text-gray-500 text-xs">{t.handle}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600 border border-gray-800 px-2 py-1 rounded-full">
                  {t.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
