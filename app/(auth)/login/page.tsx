"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Loader2 } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setSent(true);
      toast.success("Magic link sent! Check your inbox.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-chaos-pink flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-display">Defined</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {sent ? "Check your inbox" : "Sign in to Defined"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {sent
              ? "We sent a magic link to " + email
              : "Save your definitions, reorder products, and build collections."}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📬</div>
              <p className="text-gray-600 text-sm mb-6">
                Click the link in your email to sign in. No password needed!
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-brand-500 text-sm hover:underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 rounded-xl"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "✨ Send magic link"
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                No password required · Just click the link in your email
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/generate" className="text-brand-500 hover:underline">
            Start defining for free
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
