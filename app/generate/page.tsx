"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GeneratorForm from "@/components/generator/GeneratorForm";
import DefinitionResults from "@/components/generator/DefinitionResults";
import ProductPreview from "@/components/products/ProductPreview";
import type { Definition, ProductConfig, CartItem } from "@/types";
import { PRODUCT_PRICES } from "@/types";
import { generateId } from "@/lib/utils";
import toast from "react-hot-toast";

type Step = "generate" | "results" | "product" | "cart";

export default function GeneratePage() {
  const [step, setStep] = useState<Step>("generate");
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [selectedDefinition, setSelectedDefinition] =
    useState<Definition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const resultsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  function handleGenerate(defs: Definition[]) {
    setDefinitions(defs);
    setStep("results");
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleSelectAndShop(def: Definition) {
    setSelectedDefinition(def);
    setStep("product");
    setTimeout(() => {
      productRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function handleAddToCart(config: ProductConfig) {
    if (!selectedDefinition) return;

    const item: CartItem = {
      definitionId: selectedDefinition.id,
      definition: selectedDefinition,
      product: config,
      quantity: 1,
      price: PRODUCT_PRICES[config.type],
    };

    setCart((prev) => [...prev, item]);
    toast.success(
      `${selectedDefinition.name} definition added to cart! 🛒`,
      { duration: 3000 }
    );
  }

  async function handleCheckout() {
    if (!cart.length) return;
    setIsCheckingOut(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Checkout failed. Try again?");
    } finally {
      setIsCheckingOut(false);
    }
  }

  const steps = [
    { id: "generate", label: "Describe", number: 1 },
    { id: "results", label: "Pick a definition", number: 2 },
    { id: "product", label: "Choose product", number: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress bar */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      i <= currentStepIndex
                        ? "bg-brand-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s.number}
                  </div>
                  <span
                    className={`text-sm font-medium truncate hidden sm:block ${
                      i <= currentStepIndex ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-2 transition-all ${
                      i < currentStepIndex ? "bg-brand-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-24">
        {/* Step 1: Generator form */}
        <AnimatePresence mode="wait">
          <motion.section
            key="generate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/25 mb-4">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
                Who are we defining today?
              </h1>
              <p className="text-gray-500">
                The more specific you are, the more accurate the devastation.
              </p>
            </div>
            <GeneratorForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </motion.section>
        </AnimatePresence>

        {/* Step 2: Results */}
        {definitions.length > 0 && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 scroll-mt-32"
          >
            <DefinitionResults
              definitions={definitions}
              onRegenerate={() => {
                setDefinitions([]);
                setStep("generate");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onSelectAndShop={handleSelectAndShop}
              isLoading={isLoading}
            />
          </motion.section>
        )}

        {/* Step 3: Product preview */}
        {selectedDefinition && step === "product" && (
          <motion.section
            ref={productRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-32"
          >
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setStep("results")}
                className="btn-ghost text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to definitions
              </button>
            </div>
            <ProductPreview
              definition={selectedDefinition}
              onAddToCart={handleAddToCart}
              isCheckingOut={isCheckingOut}
            />

            {/* Cart summary */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Your cart ({cart.length} item{cart.length !== 1 ? "s" : ""})
                </h3>
                <div className="space-y-3 mb-6">
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        "{item.definition.name}" {item.product.type} ·{" "}
                        {item.product.theme}
                      </span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      ${cart.reduce((sum, i) => sum + i.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-primary w-full text-base py-4 rounded-xl"
                >
                  {isCheckingOut ? "Redirecting to checkout..." : "Checkout →"}
                </button>
              </motion.div>
            )}
          </motion.section>
        )}
      </div>

      <Footer />
    </main>
  );
}
