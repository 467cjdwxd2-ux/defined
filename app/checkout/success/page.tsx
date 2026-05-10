import Link from "next/link";
import { CheckCircle, Package, Share2 } from "lucide-react";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold font-display mb-3">
            Order confirmed! 🎉
          </h1>
          <p className="text-gray-500 mb-2">
            Your custom definition is being printed and will ship within 3-5 business days.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            A confirmation email is on its way to you.
          </p>

          {/* Next steps */}
          <div className="space-y-3 mb-8 text-left">
            {[
              {
                icon: Package,
                title: "Order being processed",
                desc: "Your print-on-demand order is being submitted",
              },
              {
                icon: Share2,
                title: "Share the definition",
                desc: "Download a free share card to post on social media",
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                  <step.icon className="w-4 h-4 text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-secondary flex-1 justify-center">
              Back to home
            </Link>
            <Link href="/generate" className="btn-primary flex-1 justify-center">
              ✨ Define someone else
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
