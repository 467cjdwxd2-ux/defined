"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import type { Definition, ProductType, AestheticTheme, ProductConfig } from "@/types";
import { PRODUCT_LABELS, PRODUCT_PRICES } from "@/types";
import ThemeSelector from "./ThemeSelector";
import ShareCard from "../share/ShareCard";
import { ProductMockup } from "./ProductMockupSVG";

interface ProductPreviewProps {
  definition: Definition;
  onAddToCart: (config: ProductConfig) => void;
  isCheckingOut?: boolean;
}

const products: ProductType[] = ["hoodie", "tshirt", "mug", "tote", "journal", "sticker"];

const PRODUCT_ICONS: Record<ProductType, string> = {
  hoodie:  "🧥",
  tshirt:  "👕",
  mug:     "☕",
  tote:    "👜",
  journal: "📓",
  sticker: "⭐",
};

export default function ProductPreview({
  definition,
  onAddToCart,
  isCheckingOut,
}: ProductPreviewProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("hoodie");
  const [selectedTheme, setSelectedTheme] = useState<AestheticTheme>("minimal");
  const [added, setAdded] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  function handleAddToCart() {
    const config: ProductConfig = {
      type: selectedProduct,
      theme: selectedTheme,
      colorVariant: "light",
      font: "serif-classic",
    };
    onAddToCart(config);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold font-display mb-1">Now put it on something</h2>
        <p className="text-gray-500 text-sm">Pick your product and aesthetic. Preview updates instantly.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT — Live mockup preview */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
            style={{ minHeight: "360px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedProduct}-${selectedTheme}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center p-8"
                style={{ minHeight: "360px" }}
              >
                <div style={{ width: "100%", maxWidth: "300px" }}>
                  <ProductMockup
                    type={selectedProduct}
                    definition={definition}
                    theme={selectedTheme}
                    compact={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${PRODUCT_PRICES[selectedProduct]}
              </p>
              <p className="text-xs text-gray-400">Ships in 3–5 days · Free returns on defects</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isCheckingOut}
              className={`btn-primary transition-all ${added ? "bg-green-500 hover:bg-green-600 shadow-green-500/25" : ""}`}
            >
              {isCheckingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : added ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {added ? "Added!" : "Add to cart"}
            </button>
          </div>

          {/* Share card */}
          <button
            onClick={() => setShowShareCard(!showShareCard)}
            className="btn-secondary w-full text-sm"
          >
            📱 {showShareCard ? "Hide" : "Generate"} free social share card
          </button>
        </div>

        {/* RIGHT — Options */}
        <div className="space-y-6">

          {/* Product selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose product</h3>
            <div className="grid grid-cols-3 gap-2">
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => setSelectedProduct(product)}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 overflow-hidden ${
                    selectedProduct === product
                      ? "border-brand-500 bg-brand-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  {/* Mini mockup thumbnail */}
                  <div className="w-full mb-1" style={{ height: "52px" }}>
                    <ProductMockup
                      type={product}
                      definition={definition}
                      theme={selectedProduct === product ? selectedTheme : "minimal"}
                      compact={true}
                    />
                  </div>
                  <p className={`text-xs font-semibold leading-tight ${
                    selectedProduct === product ? "text-brand-700" : "text-gray-600"
                  }`}>
                    {PRODUCT_LABELS[product]}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${
                    selectedProduct === product ? "text-brand-500" : "text-gray-400"
                  }`}>
                    ${PRODUCT_PRICES[product]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Theme selector */}
          <ThemeSelector selected={selectedTheme} onChange={setSelectedTheme} />
        </div>
      </div>

      {/* Share card */}
      <AnimatePresence>
        {showShareCard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ShareCard definition={definition} theme={selectedTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
